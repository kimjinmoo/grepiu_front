<template>
  <div class="container-fluid">
    <div class="w-100 mx-auto">
      <div class="text-center">
        검색하기
      </div>
      <form autocomplete="off">
        <b-input-group size="mg w-75 mx-auto">
          <b-input id="search" placeholder="검색어를 입력하세요" ></b-input>
          <b-input-group-append>
            <b-btn variant="outline-success">검색</b-btn>
          </b-input-group-append>
        </b-input-group>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name : "Search"
  }
</script>