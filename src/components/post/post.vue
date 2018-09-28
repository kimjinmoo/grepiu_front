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
              <router-link :to="{ name : 'PostDetail', params : {id : item.id}}"><h4 :id="item.id" class="text-dark text-lg-left">{{item.subject}}</h4></router-link>
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
    <div class="text-center m-3">
      <b-button v-on:click="onMore" v-show="isMoreBtn">더보기</b-button>
      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
    <!--<b-pagination align="center" size="md" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getPostList(cPage-1)"></b-pagination>-->
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
        cPage : 0,
        size : 5,
        isMoreBtn: false
      }
    },
    created : function() {
      // post를 불러온다.
      // this.getPostList(this.cPage);
    },
    computed : {
      posts() {
        return this.sectionLists.map(v => {
          let hashTagButton = [];
          v.hashTag.forEach(h => {
            hashTagButton.push(
              "<button type='button' class='btn btn-light btn-sm m-lg-1'>#" + h + "</button>");
          })
          v.h = hashTagButton.join("");
          return v
        })
      }
    },
    watch : {
    },
    methods : {
      infiniteHandler($state) {
        // 자동은 안되서 수동으로 적용
        // 세션 text를 불러온다.
        this.$http.get(process.env.ROOT_API+"/grepiu/post",{
          params : {
            currentPage : this.cPage++,
            size : this.size
          }
        })
        .then((response) => {
          if(response.data.list.length) {
            this.sectionLists = this.sectionLists.concat(response.data.list);
            if(this.cPage==response.data.tPage){
              $state.complete();
            }
            $state.loaded();
          }  else {
            $state.complete();
          }
          if(this.cPage>=response.data.tPage) {
            this.isMoreBtn = false;
          } else {
            this.isMoreBtn = true;
          }
        }).catch((e)=>{
          console.log(e);
          //todo 오류 alter
        });
      },
      onMore : function() {
        this.$nextTick(() => {
          this.$refs.infiniteLoading.attemptLoad();
        });
      }
    }
  }
</script>
