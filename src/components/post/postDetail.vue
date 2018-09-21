<template>
  <div class="container-fluid">
    <b-container fluid class="mb-lg-2">
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
                <p class="text-left" v-html="hash"></p>
              </div>
              <p class="text-black-50 text-sm-right small">{{post.regId}}/{{post.regDate | moment("YYYY-MM-DD HH:mm")}}</p>
            </div>
          </div>
        </b-col>
        <b-col md="2">
          <!-- 여역 3-->
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="text-center">
            관련글
            <router-link :to="{ name : 'PostDetail', params : {id : prevPost.id}}"><h4 class="text-dark text-lg-center">{{prevPost.subject}}</h4></router-link>
            <router-link :to="{ name : 'PostDetail', params : {id : nextPost.id}}"><h4 class="text-dark text-lg-center">{{nextPost.subject}}</h4></router-link>
          </div>
        </b-col>
      </b-row>
      <b-row>
          <b-col md="12">
            <div class="text-center m-3">
              <b-button-group>
                <b-button variant="success" class="pull-left" to="/post">목록으로</b-button>
              </b-button-group>
            </div>
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
        prevPost : {
          id : 0,
          subject : "",
        },
        nextPost : {
          id : 0,
          subject : "",
        },
        post : {
          id : 0,
          subject : ""
        },
        hashTags : []
      }
    },
    created : function() {
      // Post를 불러온다.
      this.init();
    },
    computed : {
      hash() {
        return this.hashTags.join("");
      }
    },
    methods : {
      init() {
        this.$http.get(process.env.ROOT_API+"/grepiu/post/"+this.id)
        .then((response) => {
          this.prevPost = Object.keys(response.data.prev).length > 0?response.data.prev:this.prevPost;
          this.post = response.data.post;
          //Set hash
          response.data.post.hashTag.forEach(h=>{
            this.hashTags.push("<button type='button' class='btn btn-light btn-sm m-lg-1'>#"+h+"</button>");
          });
          this.nextPost = Object.keys(response.data.next).length > 0?response.data.next:this.nextPost;
        }).catch((e)=>{
          console.log("error e :" + e);
        });
      }
    },
    beforeRouteUpdate(to, from, next) {
      console.log("id : "+to.params.id);
      this.id = to.params.id;
      next();
    }
  }
</script>
