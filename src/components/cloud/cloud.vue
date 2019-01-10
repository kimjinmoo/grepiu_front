<template>
  <div class="container-fluid grepIU_container">
    <h2>Cloud</h2>
    <div>경로 : {{currentDir}}</div>
    <b-button-group size="sm">
      <b-button variant="success" @click="createNewFolder">폴더 생성</b-button>
      <b-button variant="success" @click="moveUp">위로</b-button>
      <b-button variant="success" @click="moveTop">최상위경로</b-button>
      <div @dragover="allowDrop" @drop="drop">휴지통</div>
    </b-button-group>
    <div style="height: 50vh;" class="border border-danger bg-light" @click.right="right">
      <ul v-for="item in folders" style="float: left;list-style:none;padding:5px;">
        <li v-if="item.attribute == 'P'" style="float:left; margin-top: 5px">
          <img :id="item.id" src="/static/img/cloud/folder.png" style="width: 64px; height: auto;" @click="read(item.id, item.attribute, item.name)" draggable="true" @dragstart="drag">
          <div style="text-align: center"><label>{{item.name}}</label></div>
          <!--<input type="text" style="text-align: center" v-model="item.name" @blur="updateFolder(item.id, item.name)"></input>-->
        </li>
        <li v-else style="float:left; margin-top: 5px" @click="read(item.attribute)">
          <img src="/static/img/cloud/file.png" style="width: 64px; height: auto;">
          <div style="text-align: center">
            <lable >{{item.name}}</lable>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Lab from "../lab/lab";
  export default {
    name: "cloud",
    components: {Lab},
    data : function(){
      return {
        obj: [],
        pidQueue: [],
        pid: "",
        preDir: "",
        currentDir: "/",
        folders: []
      }
    },
    created() {
      this.getFolder();
    },
    computed: {
      upDir : function() {
        let folders = [];
        let pos = 0, end=0;

        while ((end = this.currentDir.indexOf("/", pos)) >= 0) {
          folders.push(this.currentDir.substring(pos, end));
          pos= end+1;
        }
        folders.pop();
        return folders.join("/")+"/";
      }
    },
    methods: {
      drag: function(ev) {
        ev.dataTransfer.setData("text", ev.target.id)
      },
      drop: function(ev) {
        let id = ev.dataTransfer.getData("text");
        if (confirm(id + " 삭제하시겠습니까?")) {
            this.$http.delete(process.env.ROOT_API + "/grepiu/cloud/"+id).then(r=>{
              this.getFolder();
            })
        }
      },
      allowDrop: function(ev) {
        ev.preventDefault()
      },
      moveTop: function() {
        this.pid = "";
        this.currentDir = "/"
        this.getFolder();
      },
      moveUp: function() {
        if(this.pidQueue.length > 0) {
          this.pidQueue = this.pidQueue.slice(0,this.pidQueue.length-1)
          console.log(this.pidQueue.length)
          if(this.pidQueue.length <= 1) {
              this.pid = ""
          } else {
            console.log(JSON.stringify(this.pidQueue[this.pidQueue.length]))
            this.pid = "";
          }
          this.getFolder();
        }
      },
      getFolder : function() {
        this.$http.get(process.env.ROOT_API + "/grepiu/cloud/", {
          params: {
            pid: this.pid,
          }
        }).then((response) => {
          this.folders = response.data;
        }).catch(v=>{
          console.log(v);
        });
      },
      read : function(pid, type, name) {
        this.pidQueue.push(pid)
        this.pid = pid
        switch (type) {
          case "P" :
            this.currentDir+=name+"/";
            this.getFolder();
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
            pid: this.pid,
            path: this.currentDir
          }).then((response) => {
          this.getFolder();
        })
      },
      updateFolder: function(fid, name) {
        const querystring = require('querystring');

        this.$http.put(process.env.ROOT_API + "/grepiu/cloud/",{
          id: fid,
          name: name
        }).then(v=>{
          this.getFolder();
        })
      }
    }
  }
</script>
