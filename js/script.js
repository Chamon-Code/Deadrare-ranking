var collections = ["EAPES-8f3c1ft", "DRIFTERS-efd96c", 
"MAIARPUNKS-3db7e8", "HSWS-858b6b", "WWWINE-5a5331"
,"SPACEROBOT-bfbf9d", "MONKSUP-421abc", "VALIDATORS-e7e287", 
"QUACK-f01e02", "LIGHTNINGB-496265", "MANY-39af2c", 
"GNOGEN-8156fb", "GNOGONS-73222b", "EGLDDIGGER-0f38cb",
"RAPTOR-28e21c", "SRC-27d8ff", "LIONESS-dd909d" , "LIONS-d7a901"];


var windUrl = window.location.href;
var last = windUrl.split("/").at(-1);
var intervalID;

console.log(windUrl);

if(windUrl.includes("my-collection")) {
    clearInterval(intervalID);
    /*
    var rankElements = {};
    // We get the collection div
    var collecDiv = document.getElementsByClassName("sc-cbkKFq gPwQfB");
    for(let i = 0; i < collecDiv.length; i++) {
        var collecName = collecDiv[i].childNodes[0].childNodes[0].textContent;
        // If the collection appears in the list of existing ones
        if(collections.includes(collecName)) {
            // We get the nfts of the collection
            var nfts = collecDiv[i].childNodes[1].childNodes[0].childNodes;
            for(let j = 0; j < nfts.length; j++) {
                // We get the area where the rank will be written
                var rankArea = nfts[j].childNodes[0].childNodes[0].childNodes[1];
                var nftId;
                if(rankArea.childNodes[0].textContent.includes("#")) {
                    nftId = rankArea.childNodes[0].textContent.split("#").at(-1);
                }
                else {
                    nftId = rankArea.childNodes[0].textContent.split(" ").at(-1);
                }
                var path = '/Database/';
                path += collecName;
                path +='.txt';
                const url = chrome.runtime.getURL(path);

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        for(let i = 0; i < collecDiv.length; i++) {
                            var collecName = collecDiv[i].childNodes[0].childNodes[0].textContent;
                            if(collections.includes(collecName)) {
                                var nfts = collecDiv[i].childNodes[1].childNodes[0].childNodes;
                                for(let j = 0; j < nfts.length; j++) {
                                    var rankArea = nfts[j].childNodes[0].childNodes[0].childNodes[1];
                                    var tag = document.createElement("p");
                                    var rankId = parseInt(data[nftId]);
                                    var nbOfNfts = parseInt(Object.keys(data).length);
                                    var text = document.createTextNode("Rank : " + rankId);
                                    if (rankId > nbOfNfts * 0.5) {
                                        tag.style.color = "red";
                                    }
                                    else if(rankId > nbOfNfts * 0.25) {
                                        tag.style.color = "orange";
                                    }
                                    else {
                                        tag.style.color = "green";
                                    }
                    
                                    tag.appendChild(text);
                                    rankArea.appendChild(tag);
                                }
                            }
                        }
                    });
                /*var res = getTextElement(collecName, nftId);
                res.then(tag => {
                    rankElements[i + " " + j] = tag; 
                });*/
   /*         }
        }
    }
    setTimeout(() => {
        for(let i = 0; i < collecDiv.length; i++) {
            var collecName = collecDiv[i].childNodes[0].childNodes[0].textContent;
            if(collections.includes(collecName)) {
                var nfts = collecDiv[i].childNodes[1].childNodes[0].childNodes;
                for(let j = 0; j < nfts.length; j++) {
                    var rankArea = nfts[j].childNodes[0].childNodes[0].childNodes[1];
                    var tag = document.createElement("p");
                    var rankId = parseInt(rankElements[i + " " + j]["id"]);
                    var nbOfNfts = parseInt(rankElements[i + " " + j]["nbOfNfts"]);
                    var text = document.createTextNode("Rank : " + rankId);
                    if (rankId > nbOfNfts * 0.5) {
                        tag.style.color = "red";
                    }
                    else if(rankId > nbOfNfts * 0.25) {
                        tag.style.color = "orange";
                    }
                    else {
                        tag.style.color = "green";
                    }

                    tag.appendChild(text);
                    rankArea.appendChild(tag);
                }
            }
        }
    }, 1000);*/
    
}
else { 

    intervalID = setInterval(callback, 1000);
    
    function callback() {
    
        var collecId;
        if(last.includes("?")){
            collecId = last.split("?")[0];
            fetchNfts(collecId, ["sc-btzYZH fYnxSZ", "sc-kGXeez iHaJUD"], 1);
            fetchNfts(collecId, ["sc-kGXeez gSAEQd", "sc-esjQYD ldZUdE", "sc-bXGyLb dcrINh", "sc-cLQEGU pZPAK", "sc-hrWEMg uZwiD"], 0, false);
        } 
        else {
            collecId = last;
            fetchNfts(collecId, ["sc-kGXeez gSAEQd", "sc-esjQYD ldZUdE", "sc-bXGyLb dcrINh", "sc-cLQEGU pZPAK", "sc-iQKALj btJFuk"], 0, false);
        }
    
    }

}

function fetchNfts(collecID, classDiv, childCount, margin = true) {
    var path = '/Database/';
    path += collecID;
    path +='.txt';

    const url = chrome.runtime.getURL(path);
    console.log(collecID);
    fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then((json) => {
            var nbOfNfts = Object.keys(json).length;
            var values = []
            for(let i=0; i<classDiv.length; i+=1) {
                values = document.getElementsByClassName(classDiv[i]);
                if(values.length > 0) {
                    break;
                }
            }
            Array.prototype.forEach.call(values, el => {
                if (el.childElementCount == childCount) {
                    var currentId = el.innerText.split("#").at(-1);
                    var tag = document.createElement("p");
                    if (parseInt(json[currentId]) > nbOfNfts * 0.5) {
                        tag.style.color = "red";
                    }
                    else if(parseInt(json[currentId]) > nbOfNfts * 0.25) {
                        tag.style.color = "orange";
                    }
                    else {
                        tag.style.color = "green";
                    }
                    if(margin) {
                        tag.style.margin = "10px";
                        tag.style.fontSize = "18px";
                    }
                    if(json[currentId]) {
                        var text = document.createTextNode(" Rank : " + json[currentId]);
                        tag.appendChild(text);
                        el.appendChild(tag);
                    }
                }
                else if (el.childElementCount > childCount && el.childNodes[childCount+1]){
                    var currentId = el.childNodes[childCount].textContent.split("#").at(-1);
                    var realRank = json[currentId];

                    var oldRank = el.childNodes[childCount+1].innerText.split(" ").at(-1);
                    if(oldRank != realRank) {
                        el.childNodes[childCount+1].textContent = " Rank : " + realRank;
                    }
                }
            });
        });
}


function getTextElement(collecName, nftId) {
    
    var path = '/Database/';
    path += collecName;
    path +='.txt';
    const url = chrome.runtime.getURL(path);
    
    return fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then((json) => {
                return {"id" : json[nftId], "nbOfNfts" : Object.keys(json).length};
            });
}
