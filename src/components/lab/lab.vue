<template>
  <div class="container grepIU_container">
    <h4><router-link to="/lab/movie">크롤링 - 롯데 시네마 영화 시간 찾기/현 위치 기준 가까운 영화관 위치 확인</router-link></h4>
    - 영화관 위치 정보,  mongodb 사용 -
    <h4>
      <router-link to="/lab/vote">웹소켓을 이용한 실시간 투표</router-link>
    </h4>
    - 실시간 투표 현황(실시간 반영됨)
  </div>
</template>
<script>
  export default {
    name: 'lab'
  }
</script>
<style type="text/css">
  h4 {
    margin-top: 5px;
  }
</style>
