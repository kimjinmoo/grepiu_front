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
                <p class="text-left" v-html="post.h"></p>
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
          <b-col md="12">
            <div class="text-center">
              <b-button-group>
                <!--<b-button variant="success" class="pull-left" v-on:click="onPrev">이전</b-button>-->
                <b-button variant="success" class="pull-left" to="/post">리스트</b-button>
                <!--<b-button variant="success" class="pull-right" v-on:click="onNext">다음</b-button>-->
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
        prev : {},
        next : {},
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
          this.prev = response.data.prev;
          this.post = response.data.post;
          this.next = response.data.next;
        }).catch(()=>{
          console.log("error");
          //todo error aler
        });
      },
      onPrev : function() {
        if (this.prev != null) {
          this.$router.push({name: 'PostDetail', params: {id: this.prev.id}})
        }
      },
      onNext : function() {
        if (this.next != null) {
          this.$router.push({name: 'PostDetail', params: {id: this.next.id}});
        }
      }
    }
  }
</script>
