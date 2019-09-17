<template>
  <div>
    <div v-if="id && t == 'IMG'" class="p-3" style="position: absolute; min-height:100%; min-width: 100%; height:auto;top:0;left:0;z-index: 9999;background-color: white;text-align: center">
      <div class="m-1">
        <b-button size="sm" variant="success" style="min-width: 100px;" @click="onClosePreview">닫기</b-button>
        <b-button size="sm" variant="danger" style="min-width: 100px;" @click="onDeleteImage">삭제</b-button>
      </div>
      <!-- 다운로드 -->
      <div v-show="!isLoaded" class="loading">이미지를 읽어 오고 있습니다.</div>
      <img :src="url" v-show="isLoaded" alert="이미지보기" @load="loaded" >
    </div>
  </div>
</template>

<script>
  import {deleteCloud, readBlobCloud} from '../file-upload.service'

  export default {
    name: "imagePreview",
    data() {
      return {
        url: null,
        isLoaded: false
      }
    },
    props: ['t', 'id'],
    watch: {
      id: function(o) {
        if(this.id) {
          readBlobCloud(this.id)
          .then(v=>{
            const blob = new Blob([v])
            let reader = new FileReader()
            reader.onloadend = e => this.url = e.target.result
            reader.readAsDataURL(blob)
          })
        }
      },
      url: function(o) {
      }
    },
    methods: {
      loaded() {
        this.isLoaded = true;
      },
      onDeleteImage() {
        if (confirm("삭제한 파일은 복구 되지 않습니다?")) {
          deleteCloud(this.id).then((d) => {
            this.$parent.load()
            this.$emit("close");
          })
        }
      },
      onClosePreview() {
        this.$emit("close");
      }
    }
  }
</script>
