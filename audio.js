window.onload = function(){
    //获取当前值的下一个值
    Array.prototype.nextValue = function(value){
        for(var j = 0, len = this.length;j < len;j++){
            if(value === this[j]){
                if(++j >= len){
                    return this[0];
                }
                return this[j];
            }
        }
        return "";
    }
    //获取当前值的上一个值
    Array.prototype.preValue = function(value){
        for(var j = 0, len = this.length;j < len;j++){
            if(value === this[j]){
                if(j === 0){
                    return this[len - 1];
                }
                return this[--j];
            }
        }
        return "";
    }

    var headerAudio = document.getElementById("header-audio"),
        audioPlay = document.getElementById("play-audio"),
        preAudio = document.getElementById("pre-audio"),
        nexAudio = document.getElementById("nex-audio");

    var music = new Array("2018061901.mp3", "2018061902.mp3", "2018061903.mp3");

    /**
     *    音乐播放
     *
     * @author XingZengZhi
     * @date 2018/6/19 21:47
     * @param
     * @return
     */
    function startPlay(isChange){
        var img = audioPlay.getElementsByTagName("img")[0],
            //音频播放路径
            splitImgSrc = img.src.substr(0, img.src.lastIndexOf('/') + 1),
            //音频文件名
            imgFile = img.src.substr(img.src.lastIndexOf('/') + 1, img.src.length);
        if(imgFile === "audio-pause.png" || typeof isChange === 'number'){
            img.src = splitImgSrc + "audio-play.png";
            //开始播放音频
            headerAudio.play();
        }else{
            img.src = splitImgSrc + "audio-pause.png";
            //暂停音频播放
            headerAudio.pause();
        }
    }

    /**
     *    切换音乐
     *
     * @author XingZengZhi
     * @date 2018/6/19 21:48
     * @param
     * @return
     */
    function changeAudio(){
        var flag = this.getAttribute("data-flag"),
            audioSrc = headerAudio.currentSrc,
            audioName = audioSrc.substr(audioSrc.lastIndexOf("/") + 1, audioSrc.length),
            audioPrefix = audioSrc.substr(0, audioSrc.lastIndexOf("/") + 1);
        if (flag > 0) {
            headerAudio.src = audioPrefix + music.nextValue(audioName);
        } else {
            headerAudio.src = audioPrefix + music.preValue(audioName);
        }
        headerAudio.load();
        startPlay(1);
    }

    //播放按钮绑定事件
    audioPlay.addEventListener("click", startPlay, false);
    //上一首
    preAudio.addEventListener("click", changeAudio, false);
    //下一首
    nexAudio.addEventListener("click", changeAudio, false);

    // headerAudio.ontimeupdate = function () {
    //     headerAudio.readyState == 4 && console.warn("正在缓冲 ：" + Math.round(headerAudio.buffered.end(0) / headerAudio.duration * 100) + '%');
    // }

}