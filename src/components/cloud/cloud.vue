<template>
  <div class="container-fluid grepIU_container">
    <image-reader :t="preview.type" :id="preview.id" @close="onClosePreview"></image-reader>
    <text-reader :url="preview.url" :t="preview.type" @close="onClosePreview"></text-reader>
    <audio-reader :t="preview.type" :id="preview.id" :file-name="preview.fileName" @close="onClosePreview"></audio-reader>
    <event-menu></event-menu>
    <b-container class="m-0">
      <b-row>
        <b-col md="auto" class="p-1">
          <b-button size="sm" variant="success" @click="createNewFolder" style="min-width: 100px;">폴더 생성</b-button>
          <b-button size="sm" variant="success" @click="moveTop" v-show="items.data.upperInfo.hasOwnProperty('parentId')" style="min-width: 100px;">최상위경로</b-button>
          <b-button size="sm" variant="success" @click="moveUp" v-show="items.data.upperInfo.hasOwnProperty('parentId')" style="min-width: 100px;">위로</b-button>
        </b-col>
        <b-col md="auto" class="p-1">
          <b-input-group size="sm" v-show="items.data.upperInfo.hasOwnProperty('name')&&items.data.upperInfo.name!=null">
            <b-form-input v-model="items.data.upperInfo.name" class="text-right"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col class="p-1">
          <b-button size="sm" variant="success" @click="rename" v-show="items.data.upperInfo.hasOwnProperty('name')&&items.data.upperInfo.name!=null" style="min-width: 100px;">변경</b-button>
          <b-button size="sm" variant="success" @click="deleteFolder" v-show="items.data.upperInfo.hasOwnProperty('parentId')" style="min-width: 100px;">삭제</b-button>
        </b-col>
      </b-row>
    </b-container>
      <div class="border border-danger bg-light" style="height: 60vh;overflow-y: scroll;">
        <div class="m-2">
          <p><b>디렉토리</b></p>
          <div style="display: grid;grid-template-columns: 25% 25% 25% 25%;text-align: center;">
            <div v-for="item in getDir" @click="read(item)" style="padding: 5% 5% 5% 5%; background-color: #0d95e8; border: 3px solid #fff; color: white;">{{item.name}}</div>
          </div>
        </div>
        <div class="m-2">
          <p><b>파일</b></p>
          <div style="display: grid;grid-template-columns: 25% 25% 25% 25%; text-align: center;">
            <div v-for="item in getFiles" style="padding: 5% 5% 5% 5%">
              <img v-bind:src="getIcon(item.files.fileName)" style="width: 64px; height: auto; cursor: pointer;" @click="read(item)">
              <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;font-size: 9pt;">{{item.files.fileName}}</p>
            </div>
          </div>
        </div>
      </div>
    <div>
      <b-button-group size="sm" class="m-1">
        <b-button variant="success">파일업로드</b-button>
        <input type="file" id="file" @change="uploadFile($event)" class="input-file" value="업로드">
      </b-button-group>
      <progress max="100" :value.prop="uploadPercentage"></progress>
    </div>
  </div>
</template>
<script>
  import imageReader from './reader/imageReader'
  import textReader from './reader/textReader'
  import audioReader from './reader/audioReader'
  import eventMenu from './event/menu'
  import {getCloud, createCloud, createFileCloud, readFileCloud, readBlobCloud, deleteCloud, renameCloud} from './file-upload.service'

  function isImage(fileName) {
    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(fileName)
  }

  function isText(fileName) {
    return (/\.(txt)$/i).test(fileName)
  }

  function isAudio(fileName) {
    return (/\.(mp3|mp4|wav)$/i).test(fileName)
  }

  export default {
    name: "cloud",
    components: {imageReader, textReader, audioReader, eventMenu},
    data : function(){
      return {
        uploadPercentage: 0,
        preview: {
          id: null,
          type: '',
          url: null,
          fileName: ''
        },
        file: '',
        obj: [],
        parentId: '',
        items: {
          code:"",
          data:{
            upperInfo: {
            },
            list:[]
          }
        },
        getIcon: function(filename) {
          let src = '/static/img/cloud/file.png'
          if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(filename)) {
            src = "/static/img/cloud/file_i.png"
          }
          if((/\.(mp3|mp4)$/i).test(filename)) {
            src = "/static/img/cloud/file_m.png"
          }
          if((/\.(text)$/i).test(filename)) {
            src = "/static/img/cloud/file_d.png"
          }
          return src
        }
      }
    },
    created() {
      this.load();
    },
    computed: {
      getDir() {
        return this.items.data.list.filter(item => item.attribute == 'D')
      },
      getFiles() {
        return this.items.data.list.filter(item => item.attribute =='F')
      }
    },
    methods: {
      // 최상위 폴더 이동
      moveTop: function() {
        this.parentId = ""
        this.items.data.upperInfo = {}
        this.load();
      },
      // 상위 경로도 이동
      moveUp: function() {
        // 클라우드 스토어 데이터를 가져온다.
        getCloud({
          params: {
            parentId: this.items.data.upperInfo.hasOwnProperty('parentId')?this.items.data.upperInfo.parentId:""
          }
        }).then(x=>{
          this.items = x;
          this.parentId = x.data.upperInfo.hasOwnProperty('parentId')?x.data.upperInfo.parentId:''
        })
      },
      // preview 닫기
      onClosePreview() {
        this.preview.url = null;
        this.preview.type = ''
      },
      // 폴더 이름 변경
      rename: function() {
        let id = this.parentId
        let name = this.items.data.upperInfo.name
        renameCloud(id, name).then(res=>{
          this.load();
        }).then(x => {
          console.log(JSON.stringify(x));
        })
      },
      // 파일 저장
      uploadFile(e) {
        const formData = new FormData()
        formData.append('cloudAttributeType','FILE')
        formData.append("file", e.target.files[0])
        formData.append("parentId", this.parentId);
        // save
        // 파일을 저장한다.
        createFileCloud(formData, (progressEvent)=> {
          this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) )
        })
        .then(x => {
          this.uploadPercentage = 0
          this.load()
        })
        .catch(err => {
          // console.log(this);
        });
      },
      // 폴더생성
      createNewFolder: function() {
        let formData = new FormData();
        formData.append('cloudAttributeType', "DIRECTORY");
        formData.append('name', "새폴더");
        formData.append("parentId", this.parentId);

        // 파일을 저장한다.
        createCloud(formData)
        .then(x => {
          this.load()
        })
        .catch(err => {
        });
      },
      deleteFolder: function() {
        let id = this.parentId
        if (confirm(this.items.data.upperInfo.name + " 삭제하시겠습니까?")) {
          deleteCloud(id).then(res=>{
            this.moveUp()
          })
        }
      },
      load : function() {
        // 클라우드 스토어 데이터를 가져온다.
        getCloud({
          params: {
            parentId: this.parentId,
          }
        }).then(x=>{
          this.items = x;
        })
      },
      read : function(item) {
        // 파일을 읽는다.
        switch (item.attribute) {
          case "D" :
            // 폴더인경우 parentId를 변경한다.
            this.parentId = item.id;

            getCloud({
              params: {
                parentId: this.parentId,
              }
            }).then(x=>{
              this.items = x;
            }).catch(e=>{
              alert('오류발생'+JSON.stringify(e));
            })
            break;
          case "F" :
            if(isAudio(item.files.fileName)) {
              this.preview.type = 'AUDIO'
              this.preview.id = item.id
              this.preview.fileName = item.files.fileName
              return true;
            }
            if(isImage(item.files.fileName)) {
              this.preview.type = 'IMG'
              this.preview.id = item.id
              return true;
            }
            if(isText(item.files.fileName)){
              readBlobCloud(item.id)
              .then(v=>{
                const blob = new Blob(["\ufeff",v])
                let reader = new FileReader()
                reader.onloadend = e => this.preview.url = e.target.result
                reader.readAsText(blob)
                this.preview.type = 'TEXT'
                this.preview.id = item.id
              })
              return true;
            }
            if(confirm('파일을 다운로드 합니다.')) {
              readFileCloud(item.id, item.name);
            }
            break;
        }
      }
    },
    mounted() {
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
