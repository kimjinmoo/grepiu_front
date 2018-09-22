<template>
  <div class="container-fluid">
    <b-container fluid class="mb-lg-2">
      <b-row class="justify-content-md-center">
        <b-col md="2">
          <!-- 영역 1-->
          <div>
          </div>
        </b-col>
        <b-col md="8">
          <div class="ql-snow">
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
              <span slot="no-results"></span>
            </infinite-loading>
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
          <div class="text-center container">
            <router-link :to="{ name : 'PostDetail', params : {id : prevPost.id}}"><h6 class="text-dark text-sm-left" v-show="isPrevExist">이전글 - {{prevPost.subject}}</h6></router-link>
            <router-link :to="{ name : 'PostDetail', params : {id : nextPost.id}}"><h6 class="text-dark text-sm-left" v-show="isNextExist">다음글 - {{nextPost.subject}}</h6></router-link>
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
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    name : "postDetail",
    components : {
      InfiniteLoading
    },
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
        hash : ""
      }
    },
    created : function() {
    },
    computed : {
      isPrevExist() {
        return (this.prevPost.id !=0)
      },
      isNextExist() {
        return (this.nextPost.id !=0)
      }
    },
    methods : {
      infiniteHandler($state) {
        this.$http.get(process.env.ROOT_API+"/grepiu/post/"+this.id)
          .then((response) => {
            this.prevPost = (response.data.prev != null) > 0?response.data.prev:this.prevPost;
            this.post = response.data.post;
            //Set hash
            let makeHashTag = [];
            response.data.post.hashTag.forEach(h=>{
              makeHashTag.push("<button type='button' class='btn btn-light btn-sm m-lg-1'>#"+h+"</button>");
            });
            this.hash = makeHashTag.join("");
            this.nextPost = (response.data.next != null) > 0?response.data.next:this.nextPost;
            $state.complete()
          }).catch((e)=>{
          console.log("error e :" + e);
        });
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.id = to.params.id;
      next();
    }
  }
</script>
