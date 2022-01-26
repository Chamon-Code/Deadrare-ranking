var rankButton = document.getElementById("rank_button");
rankButton.onclick = getAssociatedRanks;

function getAssociatedRanks() {
    var windUrl, collecId;
    chrome.tabs.query({
        currentWindow: true, 
        active: true
    }, function (tabs){
        
        for (let tab of tabs) {
            windUrl = tab.url;
            collecId = windUrl.split("/").at(-1);
        }
        extractDatas();
    });

    function extractDatas() {
        var mapIdToHex = {};
        var rankText = document.getElementById("rank").value;
        var mapIdPrice = {}
        var path = "https://gateway-production-deadrare.vercel.app/?operationName=ListAuctions&variables={\"collection\":\""+ collecId + "\"}&extensions={\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"e5d6e3b31420ee518ac78f566d4d9b1340df9dfd8193bc8c4f6f41cef52b1384\"}}";
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", path, false );
        xmlHttp.onload  = function() {
            var jsonResponse = xmlHttp.responseText;
            var values = JSON.parse(jsonResponse)['data']['listAuctions'];
            Array.prototype.forEach.call(values, el => {
                var price = parseFloat(el['price']);
                var nftId = el['cachedNft']['name'].split("#").at(-1);
                var hexValue = el['nftId'];
                mapIdToHex[nftId] = hexValue;
                mapIdPrice[nftId] = price;
            });
        };
        xmlHttp.send( null );
        var file = './../Database/';
        file += collecId;
        file +='.txt';
    
        var mapIdRank = {};
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", file, false );
        xmlHttp.onload  = function() {
            var json = JSON.parse(xmlHttp.responseText);
            for (const [key, value] of Object.entries(mapIdPrice)) {
                mapIdRank[key] = parseInt(json[key]);
            }
        }
        xmlHttp.send( null );
        var nftUnderRank = getAllIdsInferiorToRank(mapIdRank, parseInt(rankText));
        var finalRes = getMinimumPriceInIds(nftUnderRank, mapIdPrice);

        alert(JSON.stringify(finalRes));
        var resultId = parseInt(finalRes["nftId"]);
        var newUrl = windUrl.replace('collection', 'nft');
        window.open(newUrl + "-" + mapIdToHex[resultId].split("-").at(-1));
    }
}

function getAllIdsInferiorToRank(mapIdRank, rank) {
    var result = {};
    for (const [key, value] of Object.entries(mapIdRank)) {
        if(parseInt(mapIdRank[key]) < rank) {
            result[key] = mapIdRank[key]
        }
    }
    return result;
}

function getMinimumPriceInIds(mapIdRank, mapIdPrice) {
    var min = 1000000000000000;
    var id = -1;
    var rank = -1;
    for (const [key, value] of Object.entries(mapIdRank)) {
        if(parseFloat(mapIdPrice[key]) < min) {
            min = parseFloat(mapIdPrice[key]);
            id = parseInt(key);
            rank = parseInt(mapIdRank[key]);
        }
    }
    return {"price" : min, "nftId" : id, "rankNft" : rank};
}
