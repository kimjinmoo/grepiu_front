<template>
  <footer class="footer_style">
    <div class="center">
      <a href="https://github.com/kimjinmoo" target="_blank"><i class="fa custom_fa fa-github" ></i></a>
      <p class="text-center light">이메일 : iukim21c@gmail.com</p>
      <p class="text-center light">대한민국 서울 / Since 2018, GrepIU</p>
    </div>
  </footer>
</template>
<script>
  export default  {
    name : "Footer"
  }
</script>
<style>
  .footer_style {
    max-width: 100%;
    max-height: 100%;
    text-align: center;
  }
  .center {
    position: relative;
    top: 50%;
    transform: 			translateY(-50%);
  }
  .custom_fa {
    padding: 6px;
    font-size: 24px;
    width: 50px;
    text-align: center;
    text-decoration: none;
    color: black;
  }
</style>
