<template>
  <div class="container-fluid grepIU_container">
    <div>경로 : {{currentDir}}</div>
    <b-button-group size="sm" class="m-1">
      <b-button variant="success" @click="createNewFolder">폴더 생성</b-button>
      <!--<b-button variant="success" @click="moveUp">위로</b-button>-->
      <b-button variant="success" @click="moveTop">최상위경로</b-button>
      <!--<div @dragover="allowDrop" @drop="drop">휴지통</div>-->
    </b-button-group>
      <div class="border border-danger bg-light" @click.right="right" style="height: 60vh; overflow-y: auto">
        <ul v-for="item in folders" style="float: left;list-style:none;padding:5px; cursor: pointer;">
          <li v-if="item.attribute == 'P'" style="float:left; margin-top: 5px">
            <img :id="item.id" src="/static/img/cloud/folder.png" style="width: 64px; height: auto;"
                 @click="read(item)" draggable="true"
                 @dragstart="drag">
            <div style="text-align: center;white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 75px;">
              <p>{{item.name}}</p>
            </div>

          </li>
          <li v-else style="float:left; margin-top: 5px;" @click="read(item)">
            <img src="/static/img/cloud/file.png" style="width: 64px; height: auto; cursor: pointer;">
            <div style="text-align: center;white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 75px;">
              <p>{{item.files.fileName}}</p>
            </div>
          </li>
        </ul>
      </div>
    <div>
      <b-button-group size="sm" class="m-1">
        <b-button variant="success">파일업로드</b-button>
        <input type="file" multiple :name="uploadFieldName" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" class="input-file">
      </b-button-group>
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
          formData.append(fieldName, fileList[x], fileList[x].name)
        });
        formData.append("name","test")
        formData.append("path","/")
        // save it
        this.save(formData);
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;
        createCloud(formData)
        .then(x => {
          // this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS
          this.load()
        })
        .catch(err => {
          // this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED
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
          let path = this.currentDir.split("/");
          if(path.length > 0) {
            path.slice(0, path.length-2).forEach(v=>{
              console.log(v);
              if(v.trim().length > 0)
                this.currentDir = this.pid+"";
            })
            this.pid=this.currentDir.trim();
          }
          this.load();
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
        this.pid = item.pid+"/"+item.name
        switch (item.attribute) {
          case "P" :
            this.currentDir+=item.name+"/";
            this.load();
            break;
          case "F" :
            if(confirm('파일을 다운로드 합니다.')) {
              readFileCloud(item.id, item.name);
            }
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

<style>
  .input-file {
    opacity: 0;
    position: absolute;
    width: 100%;
    cursor: pointer;
  }
</style>
