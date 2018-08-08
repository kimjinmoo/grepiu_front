<template>
  <div class="container-fluid text-center">
    <h2>#로그인</h2>
    <img v-bind:src="user.photoUrl">
    <h4 class="headline mb-0"><b class="red--text">성명 :</b> {{ user.name }}</h4>
    <h4 class="headline mb-0"><b class="red--text">이메일 :</b> {{ user.email }}</h4>
    <br>
    <h2>#History</h2>
    -
  </div>
</template>
<script>
  export default {
    name: 'myAccount',
    components:{
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods : {
    }
  }
</script>
