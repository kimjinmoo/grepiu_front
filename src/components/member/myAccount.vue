<template>
  <div class="container-fluid text-center grepIU_container">
    <h2>#로그인</h2>
    <h4 class="headline mb-0"><b class="red--text">성명 :</b> {{ user.username}}</h4>
    <h4 class="headline mb-0"><b class="red--text">authorities :</b> {{ user.authorities}}</h4>
    <br>
    <div>
      <b-btn v-b-modal.modalPassword>비밀번호변경</b-btn>
      <b-btn @click="leave">탈퇴</b-btn>
    </div>
    <h2>#History</h2>
    -
    <b-modal id="modalPassword"
             ref="modal"
             title="비밀번호를 입력하세요"
             @ok="changePW"
             @shown="data = {}">
      <form>
        <b-form-input type="password" placeholder="변경 할 비밀번호를 입력하세요" v-model="userPassword.changedPassword" autocomplete="off"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>
<script>
  export default {
    name: 'MyAcount',
    data () {
      return {
        user: {
        },
        userPassword: {
          changedPassword: ""
        }
      }
    },
    computed: {
    },
    components:{
    },
    methods : {
      leave: function() {
        if (confirm("탈퇴하면 모든 데이터를 복구 할 수 없습니다. 탈퇴 하시겠습니까?")) {
          this.$http.post(process.env.ROOT_API + "/oauth/users/leave").then(r => {
            if(r.data.code == 200) {
              alert('탈퇴처리 되었습니다.')
              this.$store.dispatch("grepiu/logout")
              this.$router.replace("/")
            } else {
              alert(r.data.message);
            }
          })
        }
      },
      changePW: function() {
        this.$http.put(process.env.ROOT_API + "/oauth/users/password",this.userPassword).then(r => {
          let code = r.data.code;
          console.log("reslut : " + JSON.stringify(r.data))
          if(r.data.code == 200) {
            alert("성공적으로 변경 하였습니다.")
          } else {
            alert(r.data.message);
          }
        })
      },
      me: function() {
        this.$http.get(process.env.ROOT_API+"/oauth/users/me").then(u=>{
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
