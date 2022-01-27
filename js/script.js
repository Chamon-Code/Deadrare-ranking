var collections = ["EAPES-8f3c1ft", "DRIFTERS-efd96c", 
"MAIARPUNKS-3db7e8", "HSWS-858b6b", "WWWINE-5a5331"
,"SPACEROBOT-bfbf9d", "MONKSUP-421abc", "VALIDATORS-e7e287", 
"QUACK-f01e02", "LIGHTNINGB-496265", "MANY-39af2c", 
"GNOGEN-8156fb", "GNOGONS-73222b", "EGLDDIGGER-0f38cb",
"RAPTOR-28e21c"];
var windUrl = window.location.href;
var last = windUrl.split("/").at(-1);

var intervalID;
if(last == "my-collection") {
    clearInterval(intervalID);
    
    var rankElements = [];
    var collecDiv = document.getElementsByClassName("sc-cbkKFq gPwQfB");
    for(let i = 0; i < collecDiv.length; i++) {
        var collecName = collecDiv[i].childNodes[0].childNodes[0].textContent;
        if(collections.includes(collecName)) {
            var nfts = collecDiv[i].childNodes[1].childNodes[0].childNodes;
            for(let j = 0; j < nfts.length; j++) {
                var rankArea = nfts[j].childNodes[0].childNodes[0].childNodes[1];
                var nftId;
                if(rankArea.childNodes[0].textContent.includes("#")) {
                    nftId = rankArea.childNodes[0].textContent.split("#").at(-1);
                }
                else {
                    nftId = rankArea.childNodes[0].textContent.split(" ").at(-1);
                }
                var res = getTextElement(collecName, nftId);
                res.then(tag => rankElements.push(tag));
            }
        }
    }

    
    for(let i = 0; i < collecDiv.length; i++) {
        var nfts = collecDiv[i].childNodes[1].childNodes[0].childNodes;
        for(let j = 0; j < nfts.length; j++) {
            var rankArea = nfts[j].childNodes[0].childNodes[0].childNodes[1];
            rankArea.appendChild()
        }
    }
    
}
else { 
    intervalID = setInterval(callback, 1000);
    
    function callback() {
    
        var collecId;
        if(last.includes("?")){
            collecId = last.split("?")[0];
        } else {
            collecId = last;
        }
    
        var path = '/Database/';
        path += collecId;
        path +='.txt';
    
        const url = chrome.runtime.getURL(path);
    
        fetch(url)
            .then((response) => response.json()) //assuming file contains json
            .then((json) => {
                var nbOfNFTs = Object.keys(json).length;
                var values = document.getElementsByClassName("sc-kGXeez gSAEQd");
                Array.prototype.forEach.call(values, el => {
                    if (el.childElementCount == 0) {
                        var currentId = el.innerText.split("#").at(-1);
                        var tag = document.createElement("p");
                        if (parseInt(json[currentId]) > nbOfNFTs * 0.5) {
                            tag.style.color = "red";
                        }
                        else if(parseInt(json[currentId]) > nbOfNFTs * 0.25) {
                            tag.style.color = "orange";
                        }
                        else {
                            tag.style.color = "green";
                        }
                        var text = document.createTextNode(" Rank : " + json[currentId]);
                        tag.appendChild(text);
                        el.appendChild(tag);
                    }
                });
            });
    }

}


function getTextElement(collecName, nftId) {
    
    var path = '/Database/';
    path += collecName;
    path +='.txt';
    const url = chrome.runtime.getURL(path);
    
    return fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then((json) => {
            var nbOfNFTs = Object.keys(json).length;
            var tag = document.createElement("p");
                if (parseInt(json[nftId]) > nbOfNFTs * 0.5) {
                    tag.style.color = "red";
                }
                else if(parseInt(json[nftId]) > nbOfNFTs * 0.25) {
                    tag.style.color = "orange";
                }
                else {
                    tag.style.color = "green";
                }
                var text = document.createTextNode(" Rank : " + json[nftId]);
                tag.appendChild(text);
                return tag;
            });
}
