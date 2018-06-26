<template>
  <div class="container-fluid">
    <div class="grp bg_00">
      <p class="day_text">{{nowData}}&nbsp;</p>
      <p class="time_text">{{nowTime}}&nbsp;</p>
      <p class="text_commandBar">{{commandBar}}&nbsp;</p>
    </div>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>
<script>
  import axios from 'axios'

  export default {
    name: 'Home',
    props : {
      title : String
    },
    data : function() {
      return {
        nowData : "",
        nowTime : "",
        interval: false,
        commandBar : "_",
        commandCount : 1,
        commandTexts : [
            "Hello!",
            "안녕!",
            "你好!",
            "Salut!",
            "",
            "",
            "ERROR!!"
        ],
        startDelayTime : 1000
      }
    },
    mounted : function() {
      // 시간을 표출 한다.
      setInterval(()=>{
        this.animation_command();
      },350)
      setTimeout(()=>{
        // setInterval(()=>{
        //   var today = new Date();
        //   var h = today.getHours();
        //   var m = today.getMinutes();
        //   var s = today.getSeconds();
        //   this.nowData = today.getFullYear() + "." + this.zero(today.getMonth()+1) + "." + this.zero(today.getDate())
        //   this.nowTime =  this.zero(h) + ":" + this.zero(m) + ":" + this.zero(s);
        // }, 500)
      }, this.startDelayTime)
    },
    methods : {
      getRandomChar : function() {
        var r = Math.floor(Math.random()*26)
        return String.fromCharCode(65+r);
      },
      animation_command : function(){
        if(this.commandBar.indexOf("_") != -1){
          this.commandBar = this.commandBar.replace("_","");
        } else {
          this.commandBar+="_";
        }
        var typeEvent = Math.floor(Math.random()*10);
        //console.log(this.commandCount%3);
        if(this.commandCount%3==0)
        switch(typeEvent) {
          case 0 :
          case 1 :
            this.nowTime = this.commandTexts[Math.floor(Math.random()*this.commandTexts.length)];
          case 2 :
            this.commandBar = this.commandBar.replace("_","");
            this.commandBar += this.getRandomChar();
            break;
          default :
            this.commandBar = this.commandBar.replace("_","");
            this.commandBar = this.commandBar.substring(0,this.commandBar.length-1)
            break;
        }

        this.commandCount++;
      },
      zero : function(number) {
        var d = "0000000000"+number;
        return d.substr(d.length-2, d.length);
      }
    }
  }
</script>
<style>
  @media (max-width: 575px) {
    .grp {
      width : 100%;
      height : 370px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }
  @media (min-width: 576px) {
    .grp {
      width : 100%;
      height : 370px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }
  @media (min-width: 768px) {
    .grp {
      width : 100%;
      height : 370px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }
  @media (min-width: 992px) {
    .grp {
      width : 100%;
      height : 570px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }
  @media (min-width: 1200px) {
    .grp {
      width : 100%;
      height : 750px;
    }
    .bg_00 {
      background-color: #343a40;
    }
  }

  .grp .day_text {
    color: white;
    text-align: left;
    font-size: 2vw;
    margin-left: 16px;
  }
  .grp .time_text {
    color: white;
    text-align: center;
    font-size: 20vw;
  }
  .grp .text_commandBar {
    position: absolute;
    bottom: 0;
    color: white;
    margin-top: 0px;
    margin-left: 16px;
    font-size: 4vw;
  }
  .grp .bg_gray{
    background-color: whitesmoke;
  }
  .grp .bg_write{
    background-color: white;
  }
  .weatherEffect {
    display: none;
  }
</style>