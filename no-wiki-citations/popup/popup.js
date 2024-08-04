


var  toggle = document.getElementById("toggle");
var a = JSON.parse(localStorage.getItem("citationsOn"));

if (a) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                url: chrome.runtime.getURL(a ? "popup/hidecitations.css" : "popup/showcitations.css"),
                id: `citationstoggle`,
                tabId: tabs[0].id
            },
        );
    });
    if (toggle){
        a ? toggle.value = "on" : toggle.value = "off";
        toggle.checked = a;
        toggle.addEventListener('change', toggleCitations);
        
        
    }
    
}
else {
    if (toggle){
        toggle.value = "off";
        toggle.checked = false;
        toggle.addEventListener('change', toggleCitations);
        
        
    }
}




chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("href", request.url );
    var citationstoggle = document.getElementById(request.id);
    if (citationstoggle) {
        citationstoggle.replaceWith(newlink);
    }
    else {
        document.head.appendChild(newlink);  
    }
    
    sendResponse({ fromcontent: "This message is from content.js" });
});

function toggleCitations() {
    toggle.value == "on" ? toggle.value = "off" : toggle.value = "on";
    localStorage.setItem("citationsOn", JSON.stringify(toggle.value == "on"));
    
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                url: chrome.runtime.getURL(toggle.value == "on" ? "popup/hidecitations.css" : "popup/showcitations.css"),
                id: `citationstoggle`,
                tabId: tabs[0].id
            },
        );
    });

    /*
    var oldlink = document.getElementsByTagName("link").item(1);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("href", toggle.value == "on" ? "hidecitations.css" : "showcitations.css" );

    oldlink.replaceWith(newlink);
    */
    
    
}

