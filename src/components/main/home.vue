<template>
  <div class="container-fluid h-100">
    <div class="container">
      <b-container>
        <b-row>
          <b-col sm class="greph">
            <h3 md="auto">심심플이</h3>
            <h4 class="m-lg-2">GrepIU</h4>
          </b-col>
          <b-col sm class="greph">
            Q
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="bg-light">
      <div class="container">
        <b-container class="bg-light">
          <b-row>
            <b-col sm class="greph">
              <h6>구글 맵을 통한 근처 영화관 정보 엊기</h6>
              <b-button to="/lab/movie">확인하기</b-button>
            </b-col>
            <b-col sm class="greph">
              <h6>conf 방문하기</h6>
              <b-button href="https://conf.grepiu.com" target="_blank">확인하기</b-button>
            </b-col>
            <b-col sm class="greph">
              <h6>API 스웨거</h6>
              <b-button href="https://conf.grepiu.com/swagger-ui.html" target="_blank">확인하기
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <div class="container">
      <b-container>
        <b-row>
          <b-col sm="2">TITLE</b-col>
        </b-row>
        <b-row>
          <b-col sm class="greph">
            <h6>구글 맵을 통한 근처 영화관 정보 엊기</h6>
            <b-button to="/lab/movie">확인하기</b-button>
          </b-col>
          <b-col sm class="greph">
            <h6>conf 방문하기</h6>
            <b-button href="https://conf.grepiu.com" target="_blank">확인하기</b-button>
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
<style>
  .index {
    width: auto;
    height: auto;
  }
  .greph {
    height: 13rem;
    margin: 0.5rem;
  }
</style>
