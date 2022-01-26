


var windUrl = window.location.href;
var last = windUrl.split("/").at(-1);
if(last == "my_collection") {

    const url = chrome.runtime.getURL(path);

    var ranks = document.getElementsByClassName("sc-kGXeez gSAEQd");
    var collections = document.getElementsByClassName("sc-kGXeez jQVVXg");

    
    for(let i  = 0; i < collections.length; i++) {
        var req = collections[i].innerText.split("-");
        var collecName = req[0] + "-" + req[1];
        var nftId = ranks[i].innerText.split("#").at(-1);

        var path = '/Database/';
        path += collecName;
        path +='.txt';
    
        const url = chrome.runtime.getURL(path);

        fetch(url)
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
                    collections[i].appendChild(tag);
                });
    }
}
else if(last == "deadrare.io") {
    //Nothing happens
}
else {
    var intervalID = setInterval(callback, 1000);
    
    function callback() {
    
        var collecId = last;
    
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
    


