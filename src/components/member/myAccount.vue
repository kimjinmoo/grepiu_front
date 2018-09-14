<template>
  <div class="container-fluid text-center">
    <h2>#로그인</h2>
    <h4 class="headline mb-0"><b class="red--text">성명 :</b> {{ user.username}}</h4>
    <h4 class="headline mb-0"><b class="red--text">authorities :</b> {{ user.authorities}}</h4>
    <br>
    <div>
      <button>탈퇴</button>
    </div>
    <h2>#History</h2>
    -
  </div>
</template>
<script>
  export default {
    name: 'MyAcount',
    data () {
      return {
        user : {}
      }
    },
    components:{
    },
    methods : {
    },
    created () {
      this.$http.get("https://conf.grepiu.com/oauth/users/me").then(u=>{
        this.user = u.data.principal;
      })
    }
  }
</script>
