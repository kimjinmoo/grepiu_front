<template>
  <div class="container-fluid">
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col md="2">
          <!-- 영역 1-->
          <div></div>
        </b-col>
        <b-col md="8">
          <div class="ql-snow">
            <div class="post ql-editor" >
              <h1 :id="post.id" class="text-dark">{{post.subject}}</h1>
              <div v-html="post.content"></div>
              <div>
                <p class="text-left" v-html="post.h"></p>
              </div>
              <p class="text-black-50 text-sm-right small">{{post.regId}}/{{post.regDate | moment("YYYY-MM-DD HH:mm")}}</p>
              <div class="dropdown-divider"></div>
            </div>
          </div>
        </b-col>
        <b-col md="2">
          <!-- 여역 3-->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import 'highlight.js/styles/monokai-sublime.css'

  export default {
    name : "postDetail",
    data : function() {
      return {
        id : this.$route.params.id,
        post : {}
      }
    },
    created : function() {
      // post를 불러온다.
      this.getPost();
    },
    computed : {
      posts() {
        return this.post.map(v => {
          var hashTagButton = [];
          v.hashTag.forEach(h=>{
            hashTagButton.push("<button type='button' class='btn btn-light btn-sm m-lg-1'>#"+h+"</button>");
          })
          v.h = hashTagButton.join("");
          return v
        })
      }
    },
    methods : {
      getPost : function() {
        // 세션 text를 불러온다.
        this.$http.get(process.env.ROOT_API+"/grepiu/post/"+this.$route.params.id)
        .then((response) => {
          this.post = response.data;
          window.scrollTo(0);
        }).catch(()=>{
          console.log("error");
          //todo error aler
        });
      }
    }
  }
</script>
