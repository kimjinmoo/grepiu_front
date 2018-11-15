<template>
  <div class="container-fluid text-center">
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
             @shown="change = {}">
      <form @submit.stop.prevent="changePW">
        <b-form-input class="m-2" type="password" placeholder="이전 비밀번호를 입력하세요" v-model="change.currentPassword"></b-form-input>
        <b-form-input class="m-2" type="password" placeholder="변경 할 비밀번호를 입력하세요" v-model="change.changePassword"></b-form-input>
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
        change: {
          currentPassword: "",
          changePassword: ""
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
          })
        }
      },
      changePW: function() {

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
