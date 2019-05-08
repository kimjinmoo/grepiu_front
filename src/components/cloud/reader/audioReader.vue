<template>
  <div>
    <div v-if="url && t == 'AUDIO'" class="p-3" style="position: absolute; min-height:100%; min-width: 100%; height:auto;top:0;left:0;z-index: 9999;background-color: white;text-align: center">
      <p class="text-black-50" @click="onClosePreview">듣기(누르면 종료 됩니다)</p>
      <!-- 다운로드 -->
      <audio controls="controls" ref="audio">
        <source :src="url" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
      <h2>{{loop}}</h2>
      <h4>{{fileName}}</h4>
      <b-button @click="onPlay">재생</b-button>
      <b-button @click="onPause">정지</b-button>
      <b-button @click="onRepeat">반복</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "audioPreview",
    data() {
      return {
        currentPlayTime: 0,
        loop: 'Play'
      }
    },
    props: ['url','t', 'fileName'],
    computed : {
    },
    methods: {
      onPlay() {
        this.$refs.audio.play()
      },
      onPause() {
        this.$refs.audio.pause()
      },
      onRepeat() {
        if (this.$refs.audio.loop) {
          this.loop = "Play"
          this.$refs.audio.loop = false
        } else {
          this.loop = "Repeat"
          this.$refs.audio.loop = true
        }
      },
      onClosePreview() {
        this.$emit("close");
      }
    }
  }
</script>
