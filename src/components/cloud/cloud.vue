<template>
  <div class="container-fluid grepIU_container">
    <div>경로 : {{currentDir}}</div>
    <b-button-group size="sm">
      <b-button variant="success" @click="createNewFolder">폴더 생성</b-button>
      <b-button variant="success" @click="moveUp">위로</b-button>
      <b-button variant="success" @click="moveTop">최상위경로</b-button>
      <input type="file" multiple :name="uploadFieldName" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
      <div @dragover="allowDrop" @drop="drop">휴지통</div>
    </b-button-group>
      <div style="height: 50vh;" class="border border-danger bg-light" @click.right="right">
        <ul v-for="item in folders" style="float: left;list-style:none;padding:5px;">
          <li v-if="item.attribute == 'P'" style="float:left; margin-top: 5px">
            <img :id="item.id" src="/static/img/cloud/folder.png" style="width: 64px; height: auto;"
                 @click="read(item)" draggable="true"
                 @dragstart="drag">
            <div>
              <!--<label v-if="item != null">{{item.name}}</label>-->
            </div>

          </li>
          <li v-else style="float:left; margin-top: 5px" @click="read(item)">
            <img src="/static/img/cloud/file.png" style="width: 64px; height: auto;">
            <div style="text-align: center">
              <!--<lable v-if="item != null">{{item.name}}</lable>-->
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
  import {getCloud, createCloud, readFileCloud} from './file-upload.service'
  import Lab from "../lab/lab";

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: "cloud",
    components: {Lab},
    data : function(){
      return {
        file: '',
        obj: [],
        pidQueue: [],
        pid: "/",
        preDir: "",
        currentDir: "/",
        folders: [],
        currentStatus: null,
        uploadError: null,
        uploadedFiles: [],
        uploadFieldName: 'file'
      }
    },
    created() {
      this.load();
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      },
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
      reset() {
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        if (!fileList.length) return;
        // append the files to FormData
        Array
        .from(Array(fileList.length).keys())
        .map(x => {
          console.log(fileList[x].name)
          formData.append(fieldName, fileList[x], fileList[x].name)
        });
        formData.append("name","test")
        formData.append("path","/")
        console.log(formData);
        // save it
        this.save(formData);
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;
        createCloud(formData)
        .then(x => {
          console.log("rr : "+JSON.stringify(x))
          // this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          // this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
      },
      drag: function(ev) {
        ev.dataTransfer.setData("text", ev.target.id)
      },
      drop: function(ev) {
        let id = ev.dataTransfer.getData("text");
        if (confirm(id + " 삭제하시겠습니까?")) {
            this.$http.delete(process.env.ROOT_API + "/grepiu/cloud/"+id).then(r=>{
              this.load();
            })
        }
      },
      allowDrop: function(ev) {
        ev.preventDefault()
      },
      moveTop: function() {
        this.pid = "/"
        this.currentDir = "/"
        this.load();
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
          this.load();
        }
      },
      load : function() {
        getCloud({
          params: {
            pid: this.pid,
          }
        }).then(x=>{
          this.folders = x;
        })
      },
      read : function(item) {
        console.log(JSON.stringify(item))
        this.pidQueue.push(item.pid)
        this.pid = item.pid+"/"+item.name
        switch (item.attribute) {
          case "P" :
            this.currentDir+=item.name+"/";
            this.load();
            break;
          case "F" :
            readFileCloud(item.id);
            break;
        }
      },
      createNewFolder: function() {
        let formData = new FormData();
        formData.append('attribute', "P");
        formData.append('name', "새폴더");
        formData.append("pid", this.pid);
        formData.append("path", this.currentDir);
        createCloud(formData)
        .then(x=>{
          this.load();
        })
      },
      updateFolder: function(fid, name) {
        const querystring = require('querystring');
        this.$http.put(process.env.ROOT_API + "/grepiu/cloud/",{
          id: fid,
          name: name
        }).then(v=>{
          this.load();
        })
      }
    }, mounted() {
      this.reset();
    }
  }
</script>

