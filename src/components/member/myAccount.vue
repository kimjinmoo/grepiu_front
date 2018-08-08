<template>
  <div class="container-fluid">
    <h4 class="headline mb-0"><b class="red--text">Name :</b> {{ user.name }}</h4>
    <h4 class="headline mb-0"><b class="red--text">Email :</b> {{ user.email }}</h4>
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
