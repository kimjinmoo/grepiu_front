<template>
  <div class="signin_center">
    <h1>#Login</h1>
    <form class="form-signin" data-ember-action="2">
      <p class="small m-0">아래 로그인을 지원합니다.</p>
      <p class="small">버튼을 클릭 하세요.</p>
      <div>
        <input type="text" v-bind="login.id"/>
        <input type="password" v-bind="login.passwd"/>
        <a class="btn btn-info" v-on:click="signInGrep">GrepIU 로그인</a>
      </div>
      <div>
        <p>
          <a class="btn btn-primary fa fa-google" href="javascript:void(0);" v-on:click="signInByGoogle"><i class="fa icon-social-google"></i></a>
          &nbsp;
          <a class="btn btn-primary fa fa-facebook" href="javascript:void(0);" v-on:click="signInByFaceBook"><i class="fa icon-social-facebook"></i></a>
        </p><small class="text-muted">with Google Firebase</small>
      </div>
      <!--<input id="email" autocomplete="off"  v-model="form.email" class="ember-view ember-text-field form-control login-input" placeholder="이메일주소" type="text">-->
      <!--<input id="password" autocomplete="off" v-model="form.password" class="ember-view ember-text-field form-control login-input-pass" placeholder="비밀번호" type="password">-->

      <!--<button class="btn btn-lg btn-primary btn-block btn-center" v-on:click="signIn" data-bindattr-3="3">로그인</button>-->
      <!--<br>-->
      <!--<small class="create-account text-muted">회원가입을 하지 않으셨습니까 ?<b-button id="ember363" class="ember-view btn btn-sm btn-default" to="/signUp">일반회원가입</b-button></small>-->
    </form>
  </div>
</template>
<script>
  import axios from 'axios'
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
        axios.request({
          method: 'POST',
          url: 'http://localhost:8010/oauth/token',
          auth : {
            username : this.login.id,
            password : this.login.passwd,
          },
          data: this.login,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          json: true
        }).then(function(res) {
          //console.log(res);
        });
      },
      successLogin : function() {
        firebase.auth().onAuthStateChanged((u)=>{
          if(u) this.$router.replace('/');
        });
      },
      signInByFaceBook : function() {
        this.$store.dispatch("signUserInFacebook")
      },
      signInByGoogle : function() {
        this.$store.dispatch("signUserInGoogle")
      },
      signIn : function() {
        this.$store.dispatch("signUserIn")
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
