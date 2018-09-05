<template>
  <div class="container-fluid text-center">
      <h1>#Login</h1>
      <form class="form-signin" data-ember-action="2">
        <p class="small m-0">아래 로그인을 지원합니다.</p>
        <p class="small">버튼을 클릭 하세요.</p>
        <b-container style="padding-top: 1rem">
          <b-row>
            <b-col sm>
              <input type="text" v-model="login.id" placeholder="ID를 입력하세요" class="m-1"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <input type="password" v-model="login.passwd" placeholder="비밀번호를 입력하세요" class="m-1"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <a class="btn btn-success m-2" v-on:click="signInGrep">GrepIU 로그인</a>
            </b-col>
          </b-row>
        </b-container>
      </form>
    </div>
</template>
<script>
  import firebase from 'firebase/app';
  export default {
    name: 'signIn',
    components:{
    },
     data : function() {
      return {
        login : {
          id:"",
          passwd:"",
          grant_type:"password"
        },
        show: true,
        label: 'Loading...',
        form : {
          email : "",
          password : ""
        }
      }
     },
    computed : {
      user() {
        return this.$store.getters.user
      }
    },
    watch : {
      user(value) {
        this.$router.replace("/")
      }
    },
    methods : {
      signInGrep : function() {
        this.$store.dispatch("grepiu/login", {
          id : this.login.id,
          password : this.login.passwd
        }).then(()=>{
          this.$router.push("/")
          }
        );
      }
    }
  }
</script>
<style>
  .signin_center {
    min-height:72vh;
    vertical-align: middle;
    top: 50%;
    left: 50%;
    text-align: center;
    margin: auto;
    padding: 5px;
  }
</style>
