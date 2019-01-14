<template>
  <div>
    <div class="container-fluid grepIU-underline gnavi">
      <b-nav>
        <h6 class="info_center">{{info}}</h6>
      </b-nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: "gnavi",
    data : function() {
      return {
        info : ""
      }
    },
    watch : {
      $route(to, from) {
        this.info = to.meta.info;
      }
    },
    methods : {
    },
    mounted(){
      this.info = this.$route.meta.info;
    }
  }
</script>

<style scoped>
  .gnavi {
    height: 3rem;
  }
  .info_center {
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
  }
</style>
