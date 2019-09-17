<template>
  <div>
    <div v-if="id && t == 'AUDIO'" class="p-3" style="position: absolute; min-height:100%; min-width: 100%; height:auto;top:0;left:0;z-index: 9999;background-color: white;text-align: center">
      <div class="m-1">
        <b-button size="sm" variant="success" style="min-width: 100px;" @click="onClosePreview">닫기</b-button>
        <b-button size="sm" variant="danger" style="min-width: 100px;" @click="onDeleteAudio">삭제</b-button>
      </div>
      <!-- 다운로드 -->
      <audio controls="controls" ref="audio" @onloadeddata="loaded">
        <source :src="url" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
      <h2>{{loop}} {{repeat}}</h2>
      <h4>{{fileName}}</h4>
      <b-button @click="onPlay">재생</b-button>
      <b-button @click="onPause">정지</b-button>
      <b-button @click="onRepeat">반복</b-button>
      <b-button @click="onRepeat">리스트</b-button>
    </div>
  </div>
</template>

<script>
  import {readBlobCloud, deleteCloud} from '../file-upload.service'

  export default {
    name: "audioPreview",
    data() {
      return {
        url: null,
        isLoaded: false,
        currentPlayTime: 0,
        loop: '읽고 있는 중입니다.',
        repeat: ''
      }
    },
    props: ['fileName', 't', 'id'],
    watch: {
      id: function() {
        if(this.id) {
          readBlobCloud(this.id)
          .then(v=>{
            const blob = new Blob([v], {type: 'audio/ogg'});
            let reader = new FileReader()
            reader.onloadend = e => {
              this.url = e.target.result
            }
            reader.readAsDataURL(blob)
          })
        }
      },
      url: function(o) {
        if(this.t == 'AUDIO' && this.url) {
          this.loop = 'READY'
          this.$refs.audio.load()
        }
      }
    },
    computed : {
    },
    methods: {
      loaded() {
        console.log("complete!!")
        this.isLoaded = true;
      },
      onPlay() {
        if(!this.url) return false;
        this.loop = 'PLAY'
        this.$refs.audio.play()
      },
      onPause() {
        if(!this.url) return false;
        this.$refs.audio.pause()
      },
      onRepeat() {
        if(!this.url) return false;
        if (this.$refs.audio.loop) {
          this.repeat = ""
          this.$refs.audio.loop = false
        } else {
          this.repeat = "Repeat"
          this.$refs.audio.loop = true
        }
      },
      onDeleteAudio() {
        if(confirm("삭제한 파일은 복구 되지 않습니다?")) {
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
