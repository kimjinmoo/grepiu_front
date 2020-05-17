<template>
  <div class="container-fluid">
    <img :src="img">
    <h1>{{platformType}}</h1>
  </div>
</template>

<script>
  export default {
    name: "qr",
    data: function () {
      return {
        platformType: "P",
        img: "https://conf.grepiu.com/api/v1/qrcode/" + this.$route.params.id,
      }

    },
    methods: {
      checkPlatform: function() {
        var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

        if( varUA.indexOf('android') > -1) {
          this.platform = "A"
          // 안드로이드
        }else if (varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1) {
          // iOS 아이폰, 아이패드, 아이팟
          this.platform = "I"
        }else {
          // 그 외 디바이스
          this.platform = "P"
        }
      }
    },
    metaInfo() {
      let qrCode = this.img;
      return {
        htmlAttrs: {
          // 주 언어 명시
          lang: 'ko-KR',
          dir: 'ltr'
        },
        title: 'GrepIU',
        meta: [
          { name: 'description', content: 'GrepIU - 그렙 플레이스', vmid: 'GrepIU' },
          { name: 'keywords', content: 'Develop, Java, Vue' },
          { name: 'author', content: 'iukim21c' },
          {property: 'og:title', content: 'GrepIU 그렙 플레이스 Reader'},
          {property: 'og:site_name', content: 'GrepIU - 그렙 플레이스'},
          // The list of types is available here: http://ogp.me/#types
          {property: 'og:type', content: 'website'},
          // Should the the same as your canonical link, see below.
          {property: 'og:url', content: 'https://www.grepiu.com/'},
          // Often the same as your meta description, but not always.
          {property: 'og:description', content: '개발자 JM'},
          {property: 'og:image', content: qrCode},
        ]
      }
    },
    created() {
      this.checkPlatform();
    }
  }
</script>

<style scoped>

</style>
