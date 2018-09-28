<template>
  <div class="container-fluid">
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col md="2" class="d-none d-lg-block">
          <!-- 영역 1-->
          <div><a href="#" @click="onSearchByHashTag(null)">등록된 HashTag({{hashTotalCount}})</a></div>
          <div v-for="(hashTag) in hashLists" :key="hashTag.name">
            <div class="ml-4"><a href="#" @click="onSearchByHashTag(hashTag.name)">{{hashTag.name}}({{hashTag.count}})</a></div>
          </div>
        </b-col>
        <b-col md="8">
          <div>
            <div v-for="(item) in sectionLists" :key="item.id">
              <router-link :to="{ name : 'PostDetail', params : {id : item.id}}"><h4 :id="item.id" class="text-dark text-lg-left">{{item.subject}}</h4></router-link>
              <div>
                <span v-for="(hash) in item.hashTag">
                  <button type='button' class='btn btn-light btn-sm m-lg-1' @click="onSearchByHashTag(hash)">#{{hash}}</button>
                </span>
              </div>
              <p class="text-black-50 text-sm-right small">{{item.regId}}/{{item.regDate | moment("YYYY-MM-DD HH:mm")}}</p>
              <div class="dropdown-divider"></div>
            </div>
          </div>
        </b-col>
        <b-col md="2" class="d-none d-lg-block">
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
        hashLists : [],
        tCount : 0,
        cPage : 0,
        size : 5,
        isMoreBtn: false,
        searchHashTag: null
      }
    },
    created : function() {
      // post를 불러온다.
      // this.getPostList(this.cPage);
    },
    computed : {
      hashTotalCount() {
        return this.hashLists.reduce((a, b) => a.count + b.count, 0)
      }
    },
    watch : {
    },
    created() {
      this.initHashTags();
    },
    methods : {
      initHashTags() {
        this.$http.get(process.env.ROOT_API + "/grepiu/post/hash/statistics").then((response) => {
          this.hashLists = response.data;
        })
      },
      onSearchByHashTag(tag) {
        console.log("call! search")
        this.cPage = 0;
        this.sectionLists = []
        this.searchHashTag = tag;
        this.$nextTick(() => {
          console.log("call nextTick!")
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        });
      },
      infiniteHandler($state) {
        // 자동은 안되서 수동으로 적용
        // 세션 text를 불러온다.
        this.$http.get(process.env.ROOT_API + "/grepiu/post", {
          params: {
            currentPage: this.cPage++,
            size: this.size,
            hashTags: this.searchHashTag
          }
        })
        .then((response) => {
          if (response.data.list.length) {
            this.tCount = response.data.tCount;
            this.sectionLists = this.sectionLists.concat(response.data.list);
            if (this.cPage == response.data.tPage) {
              $state.complete();
            }
            $state.loaded();
          } else {
            $state.complete();
          }
          if (this.cPage >= response.data.tPage) {
            this.isMoreBtn = false;
          } else {
            this.isMoreBtn = true;
          }
        }).catch((e) => {
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
