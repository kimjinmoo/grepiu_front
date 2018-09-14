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
            <div v-for="(item) in posts" :key="item.id" class="post ql-editor" >
              <h1 :id="item.id" class="text-dark">{{item.subject}}</h1>
              <!--<router-link :to="{ name : 'PostDetail', params : {id : item.id }}"></router-link>-->
              <div v-html="item.content"></div>
              <div>
                <p class="text-left" v-html="item.h"></p>
              </div>
              <p class="text-black-50 text-sm-right small">{{item.regId}}/{{item.regDate | moment("YYYY-MM-DD HH:mm")}}</p>
              <div class="dropdown-divider"></div>
            </div>
          </div>
        </b-col>
        <b-col md="2">
          <!-- 여역 3-->
        </b-col>
      </b-row>
    </b-container>
    <b-pagination align="center" size="md" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getPostList(cPage-1)"></b-pagination>
  </div>
</template>
<script>
  import 'highlight.js/styles/monokai-sublime.css'

  export default {
    name : "Post",
    data : function() {
      return {
        sectionLists : [],
        tCount : 0,
        cPage : 0,
        size : 4
      }
    },
    created : function() {
      // post를 불러온다.
      this.getPostList(this.cPage);
    },
    computed : {
      posts() {
        return this.sectionLists.map(v => {
          var hashTagButton = [];
          v.hashTag.forEach(h=>{
            hashTagButton.push("<button type='button' class='btn btn-light btn-sm m-lg-1'>#"+h+"</button>");
          })
          v.h = hashTagButton.join("");
          return v
        })
      },
      currentIndex: {
        cache: false,
        get() {
          return this.$refs.carousel ? this.$refs.carousel.currentPage : 0;
        }
      }
    },
    watch : {
    },
    methods : {
      onPageChange : function(val) {
        //console.log('change', val)
      },
      handleSlideClick : function(dataset) {
        //console.log(dataset.index, dataset.name);
      },
      getPostList : function(page) {
        // 세션 text를 불러온다.
        this.$http.get(process.env.ROOT_API+"/grepiu/post",{
          params : {
            currentPage : page,
            size : this.size
          }
        })
        .then((response) => {
          this.sectionLists = response.data.list;
          this.tCount = response.data.tCount;
          window.scrollTo(0);
        }).catch(()=>{
          //todo 오류 alter
        });
      },
      prevPost : function() {
        this.getPostList(--this.cPage);
      },
      nextPost : function() {
        this.getPostList(++this.cPage);
      }
    }
  }
</script>
