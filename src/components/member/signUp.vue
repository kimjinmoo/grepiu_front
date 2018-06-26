<template>
  <div id="regForm" class="signUpFrom container-fluid">
      <div class="container">
        <h2>회원가입</h2>
        <div class="form-group">
          <input type="text" class="form-control" id="email" placeholder="email을 입력하여 주십시오." ref="email" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="password" placeholder="비밀번호를 입력하여 주십시오" ref="password" v-model="password">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="password_re" placeholder="비밀번호를 다시 입력하여 주십시오." ref="re_password" v-model="password_re">
        </div>
        <b-button-group>
          <b-button variant="danger" v-on:click="onBack">뒤로</b-button>
          <b-button variant="success" v-on:click="onSignUp">가입완료</b-button>
        </b-button-group>
      </div>
  </div>
</template>
<script>
  import firebase from 'firebase';

  export default {
    name: 'signUp',
    data : function() {
      return {
        email : "",
        password : "",
        password_re : ""
      }
    },
    methods : {
      onBack : function() {
        this.$router.go(-1);
      },
      onSignUp : function() {
        if(this.password.size != this.password_re == 0) {
          alert("비밀번호를 확인 하여주십시요.");
          return false;
        }
        this.$parent.showLoading(true);
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        }).then(()=>{this.$parent.showLoading(false);});
      }
    }
  }
</script>