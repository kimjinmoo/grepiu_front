<template>
  <div class="signin_center">
    <h1>#Login</h1>
    <form class="form-signin" data-ember-action="2">
      <p class="small m-0">아래 로그인을 지원합니다.</p>
      <p class="small">버튼을 클릭 하세요.</p>
      <p>
        <a class="btn btn-primary fa fa-google" href="javascript:void(0);" v-on:click="signInByGoogle"><i class="fa icon-social-google"></i></a>
        &nbsp;
        <a class="btn btn-primary fa fa-facebook" href="javascript:void(0);" v-on:click="signInByFaceBook"><i class="fa icon-social-facebook"></i></a>
      </p><small class="text-muted">with Google Firebase</small>
      <!--<input id="email" autocomplete="off"  v-model="form.email" class="ember-view ember-text-field form-control login-input" placeholder="이메일주소" type="text">-->
      <!--<input id="password" autocomplete="off" v-model="form.password" class="ember-view ember-text-field form-control login-input-pass" placeholder="비밀번호" type="password">-->

      <!--<button class="btn btn-lg btn-primary btn-block btn-center" v-on:click="signIn" data-bindattr-3="3">로그인</button>-->
      <!--<br>-->
      <!--<small class="create-account text-muted">회원가입을 하지 않으셨습니까 ?<b-button id="ember363" class="ember-view btn btn-sm btn-default" to="/signUp">일반회원가입</b-button></small>-->
    </form>
  </div>
</template>
<script>
  import firebase from 'firebase';
  export default {
    name: 'signIn',
    components:{
    },
     data : function() {
      return {
        show: true,
        label: 'Loading...',
        form : {
          email : "",
          password : ""
        }
      }
     },
    methods : {
      successLogin : function() {
        firebase.auth().onAuthStateChanged((u)=>{
          if(u) this.$router.replace('/');
        });
      },
      signInByFaceBook : function() {
        this.$parent.showLoading(true);
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then(()=> {
          // var token = r.credential.accessToken;
          // var user = r.user;
          this.successLogin();
        }).catch(function(error) {
          var errorCode = error.code;
          // var errorMessage = error.message;
          // var email = error.email;
          // var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
          } else {
            console.error(error);
          }
        }).then(()=>{this.$parent.showLoading(false);});
      },
      signInByGoogle : function() {
        this.$parent.showLoading(true);
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        firebase.auth().signInWithPopup(provider).then(()=> {
          // var token = r.credential.accessToken;
          // var user = r.user;
          this.successLogin();
        }).catch(function(error) {
          var errorCode = error.code;
          // var errorMessage = error.message;
          // var email = error.email;
          // var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
          } else {
            console.error(error);
          }
        }).then(()=>{this.$parent.showLoading(false);});
      },
      signIn : function() {
        console.log(this.form.email);
        console.log(this.form.password);

        this.$parent.showLoading(true);
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then(
            () => {
              this.successLogin();
            }, (err) => {
              alert(err.message)
            }
        ).then(()=>{this.$parent.showLoading(false);});
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
