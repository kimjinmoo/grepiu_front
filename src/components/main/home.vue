<template>
  <div class="container-fluid h-100">
    <carousel id="ca" :loop="true" :perPage="1" :spacePadding="2" style="background-color: #fefefe">
      <b-tooltip :show.sync="carousel.tooltip" target="ca" placement="top">
        마우스 <strong>swipe!!</strong>
      </b-tooltip>
      <slide class="label bg movie">
        <div class="inner">
          <div class="head">영화찾기</div>
          <div class="content">
            <p>좌표를 이용한 근방의 영화 찾기</p>
          </div>
          <div class="more">
            <b-btn variant="primary" to="/lab/movie">구현방식</b-btn>
            <b-btn variant="primary" to="/lab/movie">확인하기</b-btn>
          </div>
        </div>
      </slide>
      <slide class="label bg jenkins">
        <div class="inner">
          <div class="head">Jenkins</div>
          <div class="content">
            <p>CI 배포</p>
          </div>
          <div class="more">
            <b-btn variant="primary" href="https://jenkins.grepiu.com" target="_blank">확인하기(새창)</b-btn>
          </div>
        </div>
      </slide>
      <slide class="label bg selenium">
        <div class="inner">
          <div class="head">Selenium Session</div>
          <div class="content">
            <p>크롤링 및 Test 자동화</p>
          </div>
          <div class="more"><b-btn variant="primary" href="http://sselenium.grepiu.com/wd/hub/" target="_blank">확인하기(새창)</b-btn></div>
        </div>
      </slide>
      <slide class="label bg swagger">
        <div class="inner">
          <div class="head">스웨거 API</div>
          <div class="content">
            <p>- API 문서 자동화</p>
          </div>
          <div  class="more"><b-btn variant="primary" href="https://conf.grepiu.com/swagger-ui.html" target="_blank">확인하기(새창)</b-btn></div>
        </div>
      </slide>
      <slide class="label bg websocket">
        <div class="inner">
          <div class="head">WebSocket</div>
          <div class="content">
            <p>Websocket을 이용한 Push</p>
          </div>
          <div class="more">
            <b-btn variant="primary" href="https://conf.grepiu.com" target="_blank">확인하기(새창)</b-btn>
          </div>
        </div>
      </slide>
      <slide class="label bg slack">
        <div class="inner">
          <div class="head">Slack</div>
          <div class="content">
            <p>- 개발 도구</p>
          </div>
          <div class="more">
            <b-btn variant="primary" href="https://iustudy.slack.com" target="_blank">확인하기(새창)</b-btn>
          </div>
        </div>
      </slide>
    </carousel>
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
        carousel : {
          tooltip : false,
          nextLabel : ">",
          prevLabel : "<"
        },
        slide: 0,
        sliding: null,
        slideLists: []
      }
    },
    mounted : function() {
    },
    methods : {},
    created : function(){
      // 슬라이드 화면을 불러온다.
      axios.get("/static/fake/slideData.json")
      .then((response) => {
        this.slideLists = response.data.slideLists;
      })
      .catch(()=>{
        //console.log("err");
      });
    }
  }
</script>
<style>
  .label {
    height: 70vh;
    text-align: center
  ;
  }
  .bg {
    vertical-align: middle;
    background-size: cover;
    background-position: left top;
    background-repeat: no-repeat;
  }
  .movie {
    background-image: url("/static/img/bg/cinema-3218422_1920.jpg");
  }

  .jenkins {
    background-image: url("/static/img/bg/puzzle-226743_1920.jpg");
  }

  .selenium {
    background-image: url("/static/img/bg/arranged-1842261_1920.jpg");
  }

  .swagger {
    background-image: url("/static/img/bg/document-3268750_1920.jpg");
  }

  .websocket {
    background-image: url("/static/img/bg/feedback-1825515_1920.jpg");
  }

  .slack {
    background-image: url("/static/img/bg/logo-2563719_1920.jpg");
  }

  .inner {
    display: inline-block; padding: 30px;
  }
  .head {
    color: #ffffff;
    font-size: 8vw;
    text-align: center;
  }
  .content {
    color: #f0f0f0;
    font-size: 1.5vw;
    direction: rtl;
    text-align : center;
  }
  .more {
    bottom: 0;
    left: 0;
    margin: 1vw;
    font-size: 2vw;
    text-align: center;
  }

  .more a {
    margin-right: 1vw;
  }
</style>
