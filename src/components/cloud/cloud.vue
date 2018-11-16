<template>
  <div class="container-fluid">
    <h2>Cloud</h2>
    <div>경로 : {{currentDir}}</div>
    <a href="#" @click="createNewFolder">폴더 생성</a>
    <a href="#" @click="movePre">위로</a>
    <div style="height: 50vh;" class="border border-danger bg-light">
      <ul v-for="item in dir" style="float: left;list-style:none;padding:5px;">
        <li v-if="item.attribute == 'P'" style="float:left; margin-top: 5px" @click="read(item.attribute)">
          <img src="/static/img/cloud/folder.png" style="width: 64px; height: auto;">
          <div style="text-align: center">{{item.name}}</div>
        </li>
        <li v-else style="float:left; margin-top: 5px" @click="read(item.attribute)">
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
        preDir : "/",
        currentDir : "/",
        dir: []
      }
    },
    created() {
      this.getFolder();
    },
    methods: {
      movePre : function() {
        this.currentDir = this.preDir;
        this.getFolder();
      },
      getFolder : function() {
        this.$http.get(process.env.ROOT_API + "/grepiu/cloud/", {
          params: {
            id: 'iukim21c@gmail.com',
            path: this.currentDir
          }
        }).then((response) => {
          console.log(response.data);
          this.dir = response.data;
        })
      },
      read : function(type, name) {
        console.log(type);
        switch (type) {
          case "P" :
            this.preDir = this.currentDir;
            this.currentDir+="name"
            this.getFolder()
            break;
          case "F" :
            break;
        }
      },
      createNewFolder: function() {
        this.$http.post(process.env.ROOT_API + "/grepiu/cloud/",
          {
            attribute: 'P',
            createId: 'iukim21c@gmail.com',
            name: '새폴더',
            path: this.currentDir
          }).then((response) => {
          this.getFolder();
        })
      }
    }
  }
</script>
