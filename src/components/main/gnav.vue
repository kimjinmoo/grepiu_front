<template>
  <div>
    <div class="container-fluid gnavi">
      <b-nav>
        <h6 class="center">{{info}}</h6>
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
  .spacing {
    Margin-right: 10px;
  }

  .gnavi {
    border-width: 1px;
    border-color: #c6c8ca;
    border-style: solid none solid none;
    height: 3rem;
    margin: auto
  }
  .center {
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
  }
</style>
