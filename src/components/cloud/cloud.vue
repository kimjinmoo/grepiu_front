<template>
  <div class="container-fluid grepIU_container">
    <image-reader :url="preview.url" :t="preview.type" @close="onClosePreview"></image-reader>
    <text-reader :url="preview.url" :t="preview.type" @close="onClosePreview"></text-reader>
    <div>경로 : ${{pid}}${{currentDir}}$</div>
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
          <li v-else-if="item.attribute == 'F'" style="float:left; margin-top: 5px;" @click="read(item)">
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
        <input type="file" id="file" @change="filesChange($event)" class="input-file">
      </b-button-group>
    </div>
  </div>
</template>
<script>
  import imageReader from './reader/imageReader'
  import textReader from './reader/textReader'
  import {getCloud, createCloud, readFileCloud, readBlobCloud} from './file-upload.service'

  function isImage(fileName) {
    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(fileName)
  }

  function isText(fileName) {
    return (/\.(txt)$/i).test(fileName)
  }

  function getPid(currentDir) {
    let pid = "/";
    let path = currentDir.split("/");
    for(let i = 0; i > path.length; i++) {
      console.log(pid)
    }
    return pid
  }

  export default {
    name: "cloud",
    components: {imageReader, textReader},
    data : function(){
      return {
        preview: {
          type: '',
          url: null
        },
        file: '',
        obj: [],
        pid: "/",
        preDir: "",
        currentDir: "/",
        folders: [],
      }
    },
    created() {
      this.load();
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
      onClosePreview() {
        this.preview.url = null;
        this.preview.type = ''
      },
      filesChange(e) {
        // handle file changes
        const formData = new FormData();
        // append the files to FormData
        formData.append("file", e.target.files[0])
        formData.append("name","test")
        formData.append("pid", this.pid);
        formData.append("path", this.currentDir);
        // save it
        this.save(formData);
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
        // 클라우드 스토어 데이터를 가져온다.
        getCloud({
          params: {
            pid: this.pid,
          }
        }).then(x=>{
          this.folders = x;
        })
      },
      read : function(item) {
        // 파일을 읽는다.
        this.pid = getPid(this.currentDir)+item.name;
        console.log(this.pid)
        switch (item.attribute) {
          case "P" :
            this.currentDir+=item.name+"/";
            this.load();
            break;
          case "F" :
            if(isImage(item.files.fileName)) {
              readBlobCloud(item.id)
              .then(v=>{
                const blob = new Blob([v]);
                let reader = new FileReader();
                reader.onloadend = e => this.preview.url = e.target.result
                reader.readAsDataURL(blob)
                this.preview.type = 'IMG'
              })
            } else if(isText(item.files.fileName)){
              readBlobCloud(item.id)
              .then(v=>{
                const blob = new Blob(["\ufeff",v]);
                let reader = new FileReader();
                reader.onloadend = e => this.preview.url = e.target.result
                reader.readAsText(blob)
                this.preview.type = 'TEXT'
              })
            } else {
              if(confirm('파일을 다운로드 합니다.')) {
                readFileCloud(item.id, item.name);
              }
            }
            break;
        }
      },
      save(formData) {
        // 파일을 저장한다.
        createCloud(formData)
        .then(x => {
          // this.uploadedFiles = [].concat(x);
          this.load()
        })
        .catch(err => {
          // this.uploadError = err.response;
        });
      },
      createNewFolder: function() {
        let formData = new FormData();
        formData.append('attribute', "D");
        formData.append('name', "새폴더");
        formData.append("pid", this.pid);
        formData.append("path", this.currentDir);
        createCloud(formData)
        .then(x=>{
          this.load();
        })
      },
      updateFolder: function(fid, name) {
        this.$http.put(process.env.ROOT_API + "/grepiu/cloud/",{
          id: fid,
          name: name
        }).then(v=>{
          this.load();
        })
      }
    }, mounted() {
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
