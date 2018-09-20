<template>
  <div class="container-fluid">
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col md="2">
          <!-- 영역 1-->
          <div></div>
        </b-col>
        <b-col md="8">
          <div>
            <div v-for="(item) in posts" :key="item.id">
              <router-link :to="{ name : 'PostDetail', params : {id : item.id}}"><h1 :id="item.id" class="text-dark text-lg-left">{{item.subject}}</h1></router-link>
              <!--<div v-html="item.content"></div>-->
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
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    <b-pagination align="center" size="md" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getPostList(cPage-1)"></b-pagination>
  </div>
</template>
<script>
  import 'highlight.js/styles/monokai-sublime.css'
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    name : "Post",
    components : {
      InfiniteLoading
    },
    data : function() {
      return {
        sectionLists : [],
        tCount : 0,
        cPage : 0,
        size : 5
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
          v.hashTag.forEach(h => {
            hashTagButton.push(
              "<button type='button' class='btn btn-light btn-sm m-lg-1'>#" + h + "</button>");
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
      infiniteHandler($state) {
      },
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
        }).catch(()=>{
          //todo 오류 alter
        });
      },
      prevPost : function() {
        if(this.tCount < this.cPage){
          this.getPostList(--this.cPage);
        }

      },
      nextPost : function() {
        if(this.tCount > this.cPage)
          this.getPostList(++this.cPage);
      }
    }
  }
</script>
