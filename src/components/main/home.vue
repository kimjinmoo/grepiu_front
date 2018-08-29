<template>
  <div class="container-fluid h-100 ">
    <div class="container" style="background-image: url('/static/img/home_bg.png');background-repeat: no-repeat; background-size: auto">
      <b-container>
        <b-row>
          <b-col sm class="greph">
            <h1>즐기는 개발자</h1>
            <h5 class="m-lg-2">잼나게 개발하자!!</h5>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div style="background-color: #ffc107">
      <div class="container">
        <b-container style="padding-top: 1rem">
          <b-row>
            <b-col sm class="greph">
              <h3>크롤링</h3>
              <h6>- Selenium을 통한 롯데시네마 데이터 크롤링</h6>
              <h6>- 현 위치 기준 근처 영화관 찾기(GPS 필요)</h6>
              <h6>- 상영 영화/상영시간 제공</h6>
              <div class="grepb_m1">
                <b-button to="/lab/movie" variant="outline-success" >확인하기</b-button>
              </div>
            </b-col>
            <b-col sm class="greph">
              <h3>게시판</h3>
              <h6>- 개발/일상 관련 작성 예정</h6>
              <h6>- MongoDB 및 Spring Data MongoDB 를 이용해 구현</h6>
              <div class="grepb_m1">
                <b-button to="/post" variant="outline-success">확인하기</b-button>
              </div>
            </b-col>
            <b-col sm class="greph">
              <h3>배포</h3>
              <h6>- Docker를 통한 Jenkins 세팅</h6>
              <h6>- gitlab 연동 및 브런치별 빌드</h6>
              <h6>- 슬랙을 통한 빌드</h6>
              <b-button href="https://jenkins.grepiu.com" target="_blank" variant="outline-success">확인하기
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <div class="container" style="padding-top: 1rem">
      <b-container>
        <b-row>
          <b-col sm style="text-align: center">
            <h2>실험실</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm>
            <h3>Server</h3>
            <h6>Java</h6>
            <h6>Python</h6>
            <h6>Node</h6>
          </b-col>
          <b-col sm>
            <h3>Client</h3>
            <h6>Vue</h6>
            <h6>Javascript</h6>
            <h6>freemarker</h6>
          </b-col>
          <b-col sm>
            <h3>Login</h3>
            <h6>SpringBoot Oauth</h6>
            <h6>Spring Security</h6>
          </b-col>
        </b-row>
        <b-row style="margin-top: 1rem">
          <b-col sm>
            <h3>빅데이터</h3>
            <h6>엘라스틱서치</h6>
            <h6>fluentd</h6>
          </b-col>
          <b-col sm class="greph">
            <h3>ETC</h3>
            <h6>Socket 통신</h6>
            <h6>Android 개발</h6>
          </b-col>
          <b-col sm class="greph">
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
  .greph {
    height: 13rem;
    margin: 0.5rem;
  }
  .grepb_m1{
    padding:2%;
    display: table-cell;
    text-align: center;
    vertical-align: bottom;
  }
</style>
