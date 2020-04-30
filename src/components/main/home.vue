<template>
  <div>
    <!-- Step1 Contents-->
    <div class="main_bg">
      <div style="margin: auto; height:50%; width:50%; font-size: 5vw;color: white;text-align: center;">
        {{home_text}}<span class="blink">_</span>
      </div>
    </div>
    <div style="margin-top: 5px;"/>
    <div class="grep_place_post">
      <div style="margin: auto; height:50%; width:50%; font-size: 2em;color: white;text-align: center;">그렙 플레이스</div>
      <div style="text-align: center;">장소 저장, 공유</div>
      <div style="text-align: end; margin-top: 50vh; margin-right: 5vh">
        <a href="https://itunes.apple.com/app/id1507847743"><apple-market class="icon-2x" title="Apple 스토어" :size="100" decorative fill-color="#00000"/></a>
        <a href="https://play.google.com/store/apps/details?id=com.grepiu.gsapp.grep_search_app"><android-market class="icon-2x" title="구글 플레이" :size="100" fill-color="#FFFFFF" decorative /></a>
      </div>
    </div>
    <!-- End Step1 -->
    <div class="container-fluid">
      <div class="home_white_bg">
        <div class="text-center p-4">
          <h2 data-aos="fade-right"># 하는것들</h2>
        </div>
        <b-container style="min-height: 550px;" data-aos="zoom-in-down" data-aos-duration="2000">
          <b-row>
            <b-col sm>
              <div style="height: 250px;">
              <h1 style="color:#1c7430">포스팅</h1>
              <h3 style="color:#868e96">개발/일상/쓰고싶은거</h3>
              <p>
                - 분류는 Tag로 구분, Tag 분류 보기 가능, 반응형<br>
                - MongoDB 사용<br>
                - 검색 기능(대소문자 가림)<br>
                - 자동 스크롤 펴짐<br>
              </p>
              </div>
              <div class="ml-5 mb-3">
                <b-button to="/post" variant="outline-success">확인하기</b-button>
              </div>
            </b-col>
            <b-col sm>
              <div style="height: 250px;">
              <h1 style="color:#dd4b39">집창고</h1>
              <h3 style="color:#868e96">이것저것 해보고 싶은 것들</h3>
              <h3></h3>
              <p>
                - 크롤링 구현, 현 위치 기준 근처 영화관 찾기(with Google Map)<br>
                - 롯데 시내마 상영 영화/상영시간 크롤링<br>
                - Selenium 이용하여 구연<br>
                - 프럭시 서버로 크롤링해야됨(aws 접근문제)<br>
              </p>
              </div>
              <div class="ml-5 mb-3">
                <b-button to="/lab" variant="outline-success" >확인하기</b-button>
              </div>
            </b-col>
            <b-col sm>
              <div style="height: 250px;">
                <h1 style="color:#344e86">웹폴더</h1>
                <h3 style="color:#868e96">개인 저장함(로그인필요)</h3>
                <p>
                  - HTML5를 통한 파일 제어<br>
                  - Web을 통한 자료 공유<br>
                  - 음악 및 Text 읽기<br>
                  - 추후 S3로 변경해서 저장 해볼 예정<br>
                </p>
              </div>
              <div class="ml-5 mb-3">
                <b-button to="/cloud" variant="outline-success" >확인하기</b-button>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <div class="container-fluid" style="background-color: #eeeeee; min-height: 550px;">
      <b-container>
        <!-- Step2 Contents-->
        <b-row>
          <b-col>
            <img data-aos="fade-zoom-in" data-aos-delay="300" src="/static/img/bg/post.png"></img>
          </b-col>
          <b-col sm class="align-content-center">
            <div class="mt-5" data-aos="fade-left" data-aos-duration="3000">
              <h1 style="color:#0b2e13">개발자 프로필</h1>
              <h3 style="color:#868e96">경력 타임 라인/홈페이지 설명</h3>
              <p>
                - 경력 타임 라인<br>
                - 사이트 소개<br>
                - 추가 기능들<br>
                - 생각<br>
              </p>
              <div class="ml-5 mb-3">
                <b-button to="/about" variant="outline-success">확인하기</b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <!-- End Step2-->
    </div>
    <div>

    </div>
    <div class="home_use_bg p-2">
      <b-container class="container-fluid">
        <b-row>
          <b-col sm style="text-align: center">
            <h2>#</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm>
            <h3>Server</h3>
            <h6>Java</h6>
            <h6>Python</h6>
            <h6>Node</h6>
            <h6>Ehcache</h6>
          </b-col>
          <b-col sm>
            <h3>Front</h3>
            <h6>Vue</h6>
            <h6>React</h6>
            <h6>Javascript</h6>
            <h6>freemarker</h6>
          </b-col>
          <b-col sm>
            <h3>Authorization</h3>
            <h6>SpringBoot Oauth2</h6>
            <h6>Spring Security</h6>
          </b-col>
        </b-row>
        <b-row style="margin-top: 1rem">
          <b-col sm>
            <h3>빅데이터</h3>
            <h6>엘라스틱서치</h6>
            <h6>fluentd</h6>
            <h6>logstash</h6>
          </b-col>
          <b-col sm>
            <h3>ETC</h3>
            <h6>Socket 통신</h6>
            <h6>Android</h6>
          </b-col>
          <b-col sm>
            <h3>Linux</h3>
            <h6>centos</h6>
            <h6>Apache</h6>
            <h6>Nginx</h6>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>
<script>
  export default {
    name: 'Home',
    props : {
      title : String
    },
    data : function() {
      return {
        home_text: '',
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
    methods : {
      homeText() {
        const text = ["H","He","Hell","Hell","Hello","Hello W","Hello Wor","Hello Worl","Hello World"]
        let cnt = 0;
        setInterval(()=>{
          if(cnt > text.length) cnt = 0;
          this.home_text = text[cnt++]
        },1200)
      }
    },
    created : function(){
      // 슬라이드 화면을 불러온다.
      this.$http.get("/static/fake/slideData.json")
      .then((response) => {
        this.slideLists = response.data.slideLists;
      })
      .catch(()=>{
        //console.log("err");
      });
      this.homeText();
    }
  }
</script>
<style scoped>
  .index {
    width: auto;
    height: auto;
  }
  .home_up_bg {
    background-image: url('/static/img/home_bg.png');;
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center;
  }
  .home_white_bg {
    background-color: white;
  }
  .main_bg {
    min-height: 90vh;
    width: 100%;
    background: url('/static/img/bg/bg.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-attachment:scroll
  }
  .main_post {
    min-height: 90vh;
    width: 100%;
    background: url('/static/img/bg/post.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-attachment:scroll
  }

  .grep_place_post {
    min-height: 90vh;
    width: 100%;
    background: url('/static/img/home/guide_ad.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-attachment:scroll
  }

  .home_use_bg {
    background-color: #32383e;
    color: #f0f0f0;
  }
  .main_photo {
    max-height: 15em;
    padding: 10px;
  }
  .b-col_standard {
    position: relative;
    height: 36em;
    /*margin: 0.5rem;*/
  }
  .home_middle_bottom{
    position: absolute;
    bottom: 0;
    right: 0;
    bottom:   0;
  }
  .img_center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .blink {
    animation: blink-animation 1.3s steps(5, start) infinite;
    -webkit-animation: blink-animation 1.3s steps(5, start) infinite;
  }
  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  .material-design-icon.icon-2x {
    height: 15vh;
    width: 15vh;
  }

  .material-design-icon.icon-2x > .material-design-icon__svg {
    height: 15vh;
    width: 15vh;
  }
</style>
