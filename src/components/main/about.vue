<template>
  <div class="container-fluid grepIU_container">
    <b-container fluid>
      <b-row>
        <b-col md="2">
          <!-- 영역 1-->
          <div></div>
        </b-col>
        <b-col md="8">
          <h1>GrepIU</h1>
          <div>
            구성
          </div>
          <div>
            <b class="c-name">Server</b>&nbsp;AWS EC2(t2.small)
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
            <b class="c-name">etc</b>Google Maps, Vue-editor,vue-router, Quill, Axios, moment, highlight js, marker-clusterer-plus, vue-carousel, webstomp-client
          </div>
          <div>
            <h1>TIME-LINE</h1>
            <p>2018.08</p>
          </div>
          <div>
            <h1>Make</h1>
          </div>
          <carousel id="ca" :loop="true" :perPage="1" :spacePadding="2" :autoplay="carousel.auto" :speed="carousel.speed">
            <b-tooltip :show.sync="carousel.tooltip" target="ca" placement="top">
              마우스 <strong>swipe!!</strong>
            </b-tooltip>
            <slide class="label bg movie">
              <div class="home_inner">
                <div class="home_head">영화찾기</div>
                <div class="home_content">
                  <p>좌표를 이용한 근방의 영화 찾기</p>
                </div>
                <div class="home_more">
                  <b-btn variant="primary" to="/lab/movie">확인하기</b-btn>
                </div>
              </div>
            </slide>
            <slide class="label bg jenkins">
              <div class="home_inner">
                <div class="home_head">Jenkins</div>
                <div class="home_content">
                  <p>CI 배포</p>
                </div>
                <div class="home_more">
                  <b-btn variant="primary" href="https://jenkins.grepiu.com" target="_blank">확인하기(새창)</b-btn>
                </div>
              </div>
            </slide>
            <slide class="label bg selenium">
              <div class="home_inner">
                <div class="home_head">Selenium Session</div>
                <div class="home_content">
                  <p>크롤링 및 Test 자동화</p>
                </div>
                <div class="home_more"><b-btn variant="primary" href="http://sselenium.grepiu.com/wd/hub/" target="_blank">확인하기(새창)</b-btn></div>
              </div>
            </slide>
            <slide class="label bg swagger">
              <div class="home_inner">
                <div class="home_head">스웨거 API</div>
                <div class="home_content">
                  <p>- API 문서 자동화</p>
                </div>
                <div  class="home_more"><b-btn variant="primary" href="https://conf.grepiu.com/swagger-ui.html" target="_blank">확인하기(새창)</b-btn></div>
              </div>
            </slide>
            <slide class="label bg websocket">
              <div class="home_inner">
                <div class="home_head">WebSocket</div>
                <div class="home_content">
                  <p>Websocket을 이용한 Push</p>
                </div>
                <div class="home_more">
                  <b-btn variant="primary" href="https://conf.grepiu.com" target="_blank">확인하기(새창)</b-btn>
                </div>
              </div>
            </slide>
            <slide class="label bg slack">
              <div class="home_inner">
                <div class="home_head">Slack</div>
                <div class="home_content">
                  <p>- 개발 도구</p>
                </div>
                <div class="home_more">
                  <b-btn variant="primary" href="https://iustudy.slack.com" target="_blank">확인하기(새창)</b-btn>
                </div>
              </div>
            </slide>
          </carousel>
          <div class="mb-2">
            <h1>blackboard</h1>
            <b-container fluid class="p-4" style="background-color: #ffffff; border: 1px solid #555555; border-radius: 4px;">
              <p class="text-center"><img src="/static/img/about/todo_grepiu.png"></p>
            </b-container>
          </div>
        </b-col>
        <b-col md="2">
          <!-- 여역 3-->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

  export default {
    name: "About",
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

</style>
