<template>
  <div class="container-fluid h-100 ">
    <div class="container">
      <b-container>
        <b-row>
          <b-col sm class="greph">
            <h1>재미있게 개발하자</h1>
            <h4 class="m-lg-2">아자아자!!</h4>
          </b-col>
          <b-col sm class="greph">
            Q
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div style="background-color: #ffc107">
      <div class="container">
        <b-container style="padding-top: 1rem">
          <b-row>
            <b-col sm class="greph">
              <h3>크롤링 테스트</h3>
              <h6>- Selenium을 통한 롯데시네마 데이터 크롤링</h6>
              <h6>- 현 위치 기준 근처 영화관 찾기(GPS 필요)</h6>
              <h6>- 상영 영화/상영시간 제공</h6>
              <div class="grepb_m1">
                <b-button to="/lab/movie" variant="outline-success" >확인하기</b-button>
              </div>
            </b-col>
            <b-col sm class="greph">
              <h3>포스트</h3>
              <h6>- 개발/일상 관련 내용 정리</h6>
              <h6>- MongoDB로 구현</h6>
              <div class="grepb_m1">
                <b-button to="/post" variant="outline-success">확인하기</b-button>
              </div>
            </b-col>
            <b-col sm class="greph">
              <h3>API 문서 자동화</h3>
              <h6>- 스웨거 API 문서 프레임웍 적용</h6>
              <h6>- 스프링 Boot 2.0에 스웨거 적용</h6>
              <h6>- 적용 버전 2.8.2</h6>
              <b-button href="https://conf.grepiu.com/swagger-ui.html" target="_blank" variant="outline-success">확인하기
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
            <h3>Server Side</h3>
            <h6>Java</h6>
            <h6>Python</h6>
            <h6>Node</h6>
          </b-col>
          <b-col sm>
            <h3>Front</h3>
            <h6>Vue</h6>
            <h6>Javascript</h6>
          </b-col>
          <b-col sm>
            <h3>Framework</h3>
            <h6>SpringBoot Oauth 구축</h6>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm>
            <h3>BigData</h3>
            <h6>엘라스틱서치</h6>
          </b-col>
          <b-col sm class="greph">
            <h3>ETC</h3>
            <h6>Socket 통신</h6>
          </b-col>
          <b-col sm class="greph">
            <h3>Linux</h3>
            <h6>명령어 모음</h6>
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
