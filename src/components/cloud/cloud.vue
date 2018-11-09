<template>
  <div class="container-fluid">
    <h2>Cloud</h2>
    <a href="#" @click="createNewFolder">폴더 생성</a>
    <div style="height: 50vh;" class="border border-danger bg-light">
      <ul v-for="item in dir" style="float: left;list-style:none;padding:5px;">
        <li v-if="item.attribute == 'P'" style="float:left; margin-top: 5px" @click="clickFolder">
          <img src="/static/img/cloud/folder.png" style="width: 64px; height: auto;">
          <div style="text-align: center">{{item.name}}</div>
        </li>
        <li v-else style="float:left; margin-top: 5px" @click="clickFolder">
          <img src="/static/img/cloud/file.png" style="width: 64px; height: auto;">
          <div style="text-align: center">{{item.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "cloud",
    data : function(){
      return {
        dir: []
      }
    },
    created() {
      this.getFolder();
    },
    methods: {
      getFolder : function() {
        this.$http.get(process.env.ROOT_API + "/grepiu/cloud/", {
          params: {
            id: 'iukim21c@gmail.com',
            path: "/"
          }
        }).then((response) => {
            this.dir = response.data;
        })
      },
      createNewFolder: function() {
        this.$http.post(process.env.ROOT_API + "/grepiu/cloud/",
          {
            attribute: 'P',
            createId: 'iukim21c@gmail.com',
            name: '새폴더',
            path: "/"
          }).then((response) => {
          this.getFolder();
        })
      },
      clickFolder: function(obj) {
        console.log(obj);
      }
    }
  }
</script>
