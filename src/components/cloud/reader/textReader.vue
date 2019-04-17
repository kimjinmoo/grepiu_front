<template>
  <div @click="onClosePreview">
    <div v-if="url && t == 'TEXT'" class="p-3" style="position: absolute; min-height:100%; min-width: 100%; height:auto;top:0;left:0;z-index: 9999;background-color: white;">
      <p class="text-black-50">미리보기(누르면 종료 됩니다.)</p>
      <!-- view -->
      <div>
      {{url}}
      </div>
    </div>
  </div>
</template>
<script>
  import 'highlight.js/styles/monokai-sublime.css'

  export default {
    name: "textPreview",
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
