<template>
  <div class="container-fluid text-center">
    <h1>#Login</h1>
    <b-form>
      <p class="small m-0">아래 로그인을 지원합니다.</p>
      <p class="small">버튼을 클릭 하세요.</p>
      <b-container>
        <b-row align-h="center">
          <b-col md="5">
            <b-form-group label="아이디">
              <b-form-input v-model="login.id"
                            label="ID"
                            type="text"
                            placeholder="ID를 입력하세요" class="text-center m-1"
                            style="max-width: 30rem"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row align-h="center">

          <b-col md="5">
            <b-form-group label="비밀번호">
              <b-form-input v-model="login.passwd"
                            label="비밀번호"
                            type="password"
                            placeholder="비밀번호를 입력하세요" class="text-center m-1"
                            style="max-width: 30rem"></b-form-input>
            </b-form-group>
            <b-alert dismissible
                     :show="isShow"
                     @dismissed="isShow=false">{{message}}</b-alert>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button type="button" variant="primary" @click="signInGrep">로그인</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>
<script>
  export default {
    name: 'signIn',
    components:{
    },
     data : function() {
      return {
        isShow : false,
        message : "",
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
        return this.$store.getters["grepiu/getUser"]
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
        }).then(res=>{
          if(res.data.code == 200) {
            this.$router.replace("/")
          } else {
            this.message = res.data.message;
            this.isShow = true;
          }
        })
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
