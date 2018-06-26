<template>
  <footer class="footer">
    <ul style="list-style-type: none;">
      <li>
        <a href="https://github.com/kimjinmoo" target="_blank"><i class="fa custom_fa fa-github" ></i></a>
      </li>
      <li>
        <p class="m-0 text-center text-write">이메일 : iukim21c@gmail.com</p>
      </li>
      <li>
        <p class="m-0 text-center text-write">대한민국 서울 / Since 2018, GrepIU</p>
      </li>
    </ul>
  </footer>
</template>
<script>
  export default  {
    name : "Footer"
  }
</script>
<style>
  .custom_fa {
    padding: 20px;
    font-size: 30px;
    width: 50px;
    text-align: center;
    text-decoration: none;
    color: #0d95e8;
  }
  .footer {
    min-height: 75px;
    background-color: #fefefe;
  }

  .footer ul{
    margin: 10px;
  }
</style>