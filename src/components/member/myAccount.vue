<template>
  <div class="container-fluid text-center">
    <h2>#로그인</h2>
    <h4 class="headline mb-0"><b class="red--text">성명 :</b> {{ user.username}}</h4>
    <h4 class="headline mb-0"><b class="red--text">authorities :</b> {{ user.authorities}}</h4>
    <br>
    <div>
      <b-button @click="leave">비밀번호변경</b-button>
      <b-button @click="leave">탈퇴</b-button>
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
        user : {
        }
      }
    },
    computed: {
    },
    components:{
    },
    methods : {
      leave : function() {
        this.axios.get(process.env.ROOT_API+"/oauth/users/leave").then(r=>{
        })
      },
      me: function() {
        this.axios.get(process.env.ROOT_API+"/oauth/users/me").then(u=>{
          this.user = u.data.principal;
        })
      }
    },
    mounted () {
      let user = localStorage.user;
      if(user){
        this.me();
      } else {

      }
    }
  }
</script>
