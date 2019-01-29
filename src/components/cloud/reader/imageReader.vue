<template>
  <div @click="onClosePreview">
    <div v-if="url && t == 'IMG'" style="position: absolute; min-height:100%; min-width: 100%; height:auto;top:0;left:0;z-index: 9999;background-color: black">
      <p class="text-white">미리보기</p>
      <!-- 다운로드 -->
      <img :src="url" alert="이미지보기" >
    </div>
  </div>
</template>

<script>
  export default {
    name: "imagePreview",
    data() {
      return {
      }
    },
    props: ['url','t'],
    methods: {
      onClosePreview() {
       this.$emit("close");
      }
    }
  }
</script>
