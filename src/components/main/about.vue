<template>
  <div class="container-fluid grepIU_container">
    <b-container fluid>
      <b-row>
        <b-col md="2">
          <!-- 영역 1-->
          <div></div>
        </b-col>
        <b-col md="8">
          <h1>Dev, JM</h1>
          <h3>Developer career TIME-LINE</h3>
          <div style="text-align: center;">
            <img src="/static/img/about/timeline.png">
          </div>
          <h3>grepiu.com</h3>
          <div>
            <b class="c-name">Server</b>&nbsp;AWS EC2(t3a.small)
          </div>
          <div>
            <b class="c-name">API</b>Spring Boot 2.0
          </div>
          <div>
            <b class="c-name">Front</b>Vue , Bootstrap-vue
          </div>
          <div>
            <b class="c-name">Login</b>Spring Security + Oauth2
          </div>
          <div>
            <b class="c-name">lib</b>Google Maps, Vue-editor,vue-router, Quill, Axios, moment, highlight js, marker-clusterer-plus, vue-carousel, webstomp-client
          </div>
          <br>
          <div>
            <h1>끄적끄적</h1>
          </div>
          <carousel id="ca" :loop="true" :perPage="1" :spacePadding="2" :autoplay="carousel.auto" :speed="carousel.speed">
            <b-tooltip :show.sync="carousel.tooltip" target="ca" placement="top">
              마우스 <strong>swipe!!</strong>
            </b-tooltip>
            <slide class="label bg store">
              <div class="home_inner">
                <div style="color: #ffffff;font-size: 2vmax;font-weight: bold;text-align: end; width: 60vw;">그렙 플레이스</div>
                <div style="color: #ffffff;font-size: 1vmax;text-align: end; width: 60vw;">
                  <p>좌표로 나만의 장소 저장, 정보 공유</p>
                </div>
                <div class="home_more" style="text-align: end;">
                  <a href="https://itunes.apple.com/app/id1507847743"><apple-market class="icon-2x" title="Apple 스토어" :size="100" decorative fill-color="#00000"/></a>
                  <a href="https://play.google.com/store/apps/details?id=com.grepiu.gsapp.grep_search_app"><android-market class="icon-2x" title="구글 플레이" :size="100" fill-color="#FFFFFF" decorative /></a>
<!--                  <b-btn variant="primary" href="https://play.google.com/store/apps/details?id=com.grepiu.gsapp.grep_search_app" target="_blank">안드로이드</b-btn>-->
<!--                  <b-btn variant="primary" href="https://itunes.apple.com/app/id1507847743" target="_blank">IOS</b-btn>-->
                </div>
              </div>
            </slide>
            <slide class="label bg selenium">
              <div class="home_inner">
                <div class="home_head">여주 자전거 여행</div>
                <div class="home_content">
                  <p>자전거 여행 안내 앱</p>
                </div>
                <div class="home_more" style="text-align: end;">
                  <a href="https://play.google.com/store/apps/details?id=com.grepiu.bk"><android-market class="icon-2x" title="구글 마켓" :size="100" fill-color="#FFFFFF" decorative /></a>
                </div>
              </div>
            </slide>
            <slide class="label bg movie">
              <div class="home_inner">
                <div class="home_head">크롤링 테스트</div>
                <div class="home_content">
                  <p>크롤링을 통한 근방의 영화관 및 영화 찾기</p>
                </div>
                <div class="home_more">
                  <b-btn variant="primary" to="/lab/movie">확인하기</b-btn>
                </div>
              </div>
            </slide>
            <slide class="label bg websocket">
              <div class="home_inner">
                <div class="home_head">WebSocket</div>
                <div class="home_content">
                  <p>Websocket을 이용한 채팅</p>
                </div>
                <div class="home_more">
                  <b-btn variant="primary" href="https://conf.grepiu.com" target="_blank">확인하기(새창)</b-btn>
                </div>
              </div>
            </slide>
            <slide class="label bg slack">
              <div class="home_inner">
                <div class="home_head">Slack 채널</div>
                <div class="home_content">
                  <p>- 개발 도구</p>
                </div>
                <div class="home_more">
                  <b-btn variant="primary" href="https://iustudy.slack.com" target="_blank">확인하기(새창)</b-btn>
                </div>
              </div>
            </slide>
          </carousel>
        </b-col>
        <b-col md="2">
          <!-- 여역 3-->
        </b-col>
      </b-row>
    </b-container>
    <br>
  </div>
</template>
<script>
  import AppleIos from 'vue-material-design-icons/AppleIos';

  export default {
    name: "About",
    component: {
      AppleIos
    },
    data : function() {
      return {
        carousel : {
          speed : 300,
          auto : true,
          tooltip : false,
          nextLabel : ">",
          prevLabel : "<"
        },
        slide: 0,
        sliding: null,
        slideLists: []
      }
    },
    created() {
      // 슬라이드 화면을 불러온다.
      this.$http.get("/static/fake/slideData.json")
      .then((response) => {
        this.slideLists = response.data.slideLists;
      })
      .catch(()=>{
        //console.log("err");
      });
    },
    methods : {
    }
  };
</script>
<style type="text/css">
  .c-name {
    margin-right: 1em;
  }
  .home_inner {
    display: inline-block; padding: 1vmax;
  }
  .home_head {
    color: #ffffff;
    font-size: 2vmax;
    text-align: center;
  }
  .home_content {
    color: #f0f0f0;
    font-size: 1vmax;
    direction: rtl;
    text-align : center;
  }
  .home_more {
    bottom: 0;
    left: 0;
    font-size: 3vw;
    text-align: center;
  }

  .home_more a {
    margin: auto;
  }

  .label {
    height: 15vmax;
    text-align: center;
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

  .store {
    background-image: url("/static/img/bg/store.jpg");
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

  .material-design-icon.icon-2x {
    height: 2em;
    width: 2em;
  }

  .material-design-icon.icon-2x > .material-design-icon__svg {
    height: 2em;
    width: 2em;
  }
</style>
