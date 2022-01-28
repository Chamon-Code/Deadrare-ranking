var collections = ["EAPES-8f3c1ft", "DRIFTERS-efd96c", 
"MAIARPUNKS-3db7e8", "HSWS-858b6b", "WWWINE-5a5331"
,"SPACEROBOT-bfbf9d", "MONKSUP-421abc", "VALIDATORS-e7e287", 
"QUACK-f01e02", "LIGHTNINGB-496265", "MANY-39af2c", 
"GNOGEN-8156fb", "GNOGONS-73222b", "EGLDDIGGER-0f38cb",
"RAPTOR-28e21c"];
var windUrl = window.location.href;
var last = windUrl.split("/").at(-1);
var intervalID;

if(windUrl.includes("my-collection")) {
    clearInterval(intervalID);
    
    if(!last.includes("?")){
        var checkReload = document.getElementsByClassName("sc-cbkKFq gPwQfB");
        if(checkReload.length == 0) {
            setTimeout(() => {}, 1000);
            window.location.reload();
        }
    }

    var rankElements = {};
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
                /*
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
                    });*/
                var res = getTextElement(collecName, nftId);
                res.then(tag => {
                    rankElements[i + " " + j] = tag; 
                });
            }
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
    }, 1000);
    
}
else { 

    intervalID = setInterval(callback, 1000);
    
    function callback() {
    
        var collecId, activity;
        if(last.includes("?")){
            collecId = last.split("?")[0];
            if(last.split("?")[1] == "tab=activity") {
                fetchNfts(collecId, "sc-btzYZH fYnxSZ", 1);
            }
        } else {
            collecId = last;
            fetchNfts(collecId, "sc-kGXeez gSAEQd", 0, false);
        }
    
    }

}

function fetchNfts(collecID, classDiv, childCOunt, margin = true) {
    var path = '/Database/';
    path += collecID;
    path +='.txt';

    const url = chrome.runtime.getURL(path);

    fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then((json) => {
            var nbOfNfts = Object.keys(json).length;
            var values = document.getElementsByClassName(classDiv);
            Array.prototype.forEach.call(values, el => {
                if (el.childElementCount == childCOunt) {
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
                    }
                    var text = document.createTextNode(" Rank : " + json[currentId]);
                    
                    tag.appendChild(text);
                    el.appendChild(tag);
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
