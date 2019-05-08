<template>
  <div @click="onClosePreview">
    <div v-if="url && t == 'AUDIO'" class="p-3" style="position: absolute; min-height:100%; min-width: 100%; height:auto;top:0;left:0;z-index: 9999;background-color: white;text-align: center">
      <p class="text-black-50">미리보기(누르면 종료 됩니다)</p>
      <!-- 다운로드 -->
      <audio controls="controls">
        <source :src="url" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
      <h4>{{fileName}}</h4>
      <b-button>재생</b-button>
      <b-button>정지</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "audioPreview",
    data() {
      return {
      }
    },
    props: ['url','t', 'fileName'],
    methods: {
      onClosePreview() {
        this.$emit("close");
      }
    }
  }
</script>
