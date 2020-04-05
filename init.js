//insert functionality into document header
(function initializeYT_polymer() {
  var resourceUrl = chrome.extension.getURL("resources"),
    scriptNode = document.createElement("script");
    scriptNode.textContent = '(function(){var s=document.createElement("script");s.src="' + resourceUrl + '/"+(window.Polymer?"youtube-polymer.js":"youtube.js");document.head.appendChild(s)})();';
    document.head.appendChild(scriptNode);  
})();


