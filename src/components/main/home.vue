<template>
  <div>
    <!-- Step1 Contents-->
    <div style="min-height: 100vh;width:100%; background: url('/static/img/bg/bg.jpg') no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;">
      <div style="margin: auto; width:50%; font-size: 10em;color: white;text-align: center;" class="blink">
        _
      </div>
    </div>
    <div class="container-fluid">
      <div class="home_up_bg m-2">
        <div class="container">

        </div>
      </div>
      <!-- End Step1 -->

      <!-- Step2 Contents-->
      <div class="home_middle_bg" style="min-height: 50vh;width:100%;">
        <div class="container">
          <b-container style="padding-top: 1rem">
            <b-row>
              <b-col sm class="b-col_standard">
                <h3>크롤링</h3>
                <h6>- Selenium을 통한 롯데시네마 데이터 크롤링</h6>
                <h6>- 현 위치 기준 근처 영화관 찾기(GPS 필요)</h6>
                <h6>- 상영 영화/상영시간 제공</h6>
                <div class="home_middle_bottom">
                  <b-button to="/lab/movie" variant="success" >확인하기</b-button>
                </div>
              </b-col>
              <b-col sm class="b-col_standard">
                <h3>포스팅</h3>
                <h6>- 개발/일상 관련 작성 예정</h6>
                <h6>- NOSQL 기반(Mongo-DB)</h6>
                <div class="home_middle_bottom">
                  <b-button to="/post" variant="success">확인하기</b-button>
                </div>
              </b-col>
              <b-col sm class="b-col_standard">
                <h3>CI 구성</h3>
                <h6>- Docker를 통한 Jenkins 세팅</h6>
                <h6>- gitlab 연동 및 브런치별 빌드</h6>
                <h6>- 슬랙을 통한 빌드 정보 획득</h6>
                <div class="home_middle_bottom">
                  <b-button href="https://jenkins.grepiu.com" target="_blank" variant="success">확인하기</b-button>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </div>
      <!-- End Step2-->

    </div>
    <div class="home_use_bg home_margin_standard p-2">
      <b-container class="container">
        <b-row>
          <b-col sm style="text-align: center">
            <h2>#하고 있는 것들</h2>
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
          </b-col>
          <b-col sm>
            <h3>ETC</h3>
            <h6>Socket 통신</h6>
            <h6>Android 개발</h6>
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
      this.$http.get("/static/fake/slideData.json")
      .then((response) => {
        this.slideLists = response.data.slideLists;
      })
      .catch(()=>{
        //console.log("err");
      });
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
  .home_middle_bg {
    background-color: white;
  }
  .home_middle_bottom{
    position: absolute;
    margin: 0.5rem;
    right:    0;
    bottom:   0;
    text-align: center;
    /*padding:2%;*/
    /*display: table-cell;*/
    /*text-align: center;*/
    /*vertical-align: bottom;*/
  }
  .home_use_bg {
    background-color: #32383e;
    color: #f0f0f0;
  }
  .b-col_standard {
    height: 13rem;
    margin: 0.5rem;
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
</style>
