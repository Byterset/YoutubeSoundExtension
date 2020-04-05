
(function (a) {
    var Db = function (event) {
        console.log("on video scroll triggered");
        event.preventDefault();
        try {
            var volume = video_element.getVolume();
            //console.log("MouseWheelDelta: " + a.deltaY);
            if (event.deltaY > 0) {
                volume -= 2;
            }
            else if (event.deltaY < 0) {
                volume += 2;
            }
            if (volume < 0) {
                video_element.isMuted();
                volume = 0;
            }
            if (volume > 100) volume = 100;
            if (volume > 0) video_element.unMute();

            video_element.setVolume(volume);

            clearTimeout(hideIndicatorTimeout);
            yt_se_volumeindicator.setAttribute("style", "display:block!important");
            hideIndicatorTimeout = setTimeout(function () {
                yt_se_volumeindicator.setAttribute("style", "display:none!important")
            }, 1500);

            yt_se_volumeindicator.innerHTML = volume.toFixed(0);

            var timestamp = Date.now();
            var isMuted = volume > 0 ? "false" : "true";
            localStorage["yt-player-volume"] = '{"data":"{\\"volume\\":' + volume + ',\\"muted\\":' + isMuted + '}","expiration":' + (timestamp + 2592E6) + ',"creation":' + timestamp + "}";
            sessionStorage["yt-player-volume"] = '{"data":"{\\"volume\\":' + volume + ',\\"muted\\":' + isMuted + '}","creation":' + timestamp + "}"
        } catch (err) { console.log(err);}
    },
    
    init = function () {
        console.log("initializing all elements...");
        //initialize div to display the video volume in the upper left corner
        yt_se_volumeindicator = document.createElement("div");
        yt_se_volumeindicator.classList.add("yt_se_volumeIndicator"); //style of the div
        yt_se_volumeindicator.setAttribute("style", "display:none!important")
        video_element.insertBefore(yt_se_volumeindicator, video_element.childNodes[0]);
        var video_container = video_element.parentNode;
        //g = d.querySelector("video.html5-main-video");
        video_container.addEventListener('wheel', Db, {passive: false});
        video_container.addEventListener('mousewheel', Db, {passive: false});
        video_container.addEventListener('DOMMouseScroll', Db, {passive: false});
    },

    attacheVideo = function(){
        console.log("trying to find video");
        video_element = document.querySelector(".html5-video-player");

        if (video_element){
            init();
            console.log("Video Element found");
        } 
        else if(numtry <= maxtrys){
            numtry +=1;
            console.log("not found... next try "+ numtry + "/" + maxtrys);
            setTimeout(attacheVideo(), 500);
            
        }
    },
    hideIndicatorTimeout = setTimeout(function () { }, 10),
    yt_se_volumeindicator = undefined,
    numtry = 1,
    maxtrys = 5;

    setTimeout(attacheVideo,500);
    
    
  
})(document);