<template>
  <div class="container-fluid grepIU_container">
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col md="2" class="d-none d-lg-block">
          <!-- 영역 1-->
          <div><a href="#" @click="onSearchByHashTag(null)">All Tag</a></div>
          <div v-for="(hashTag) in hashLists" :key="hashTag.name" class="small">
            <div><a href="#" @click="onSearchByHashTag(hashTag.name)">#{{hashTag.name}}({{hashTag.count}})</a></div>
          </div>
        </b-col>
        <b-col md="8">
          <div class="input-group mb-3">
            <input type="text" v-on:input="searchFilter = $event.target.value" class="form-control" placeholder="검색" aria-label="Search" aria-describedby="basic-addon2">
            <div class="mt-3">
              <a href="#"><search-web class="icon-2x" title="Apple 스토어" :size="100" decorative fill-color="#00000" @click="onSearchByFilter"/></a>
            </div>
          </div>
          <div v-show="searchHashTag != null">
            <h1>Selected</h1>
            <p><b-badge>{{searchHashTag}}</b-badge></p>
          </div>
          <div v-show="searchFilter != null && searchFilter.length > 0">
            <h1>Filter</h1>
            <p><b-badge>{{searchFilter}}</b-badge></p>
          </div>
          <div>
            <div v-for="(item, index) in sectionLists" :key="item.id">
              <router-link :to="{ name : 'PostDetail', params : {id : item.id}}"><h4 :id="item.id" class="text-dark text-lg-left">{{item.subject}}</h4></router-link>
              <div>
                <span v-for="(hash) in item.hashTag">
                  <button type='button' class='btn btn-light btn-sm m-lg-1' @click="onSearchByHashTag(hash)">#{{hash}}</button>
                </span>
              </div>
              <p class="text-black-50 text-sm-right small">{{item.regId}}/{{item.regDate | moment("YYYY-MM-DD HH:mm")}}</p>
              <div class="dropdown-divider" v-show="sectionLists.length > index+1"></div>
            </div>
          </div>
        </b-col>
        <b-col md="2" class="d-none d-lg-block">
          <!-- 여역 3-->
        </b-col>
      </b-row>
    </b-container>
    <div class="text-center">
      <div class="d-lg-none" v-show="searchHashTag != null">
        <a href="#" @click="onSearchByHashTag(null)">All Tag</a>
      </div>
      <b-button v-on:click="onMore" class="m-2" v-show="isMoreBtn">더보기</b-button>
      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
        <span slot="no-more"></span>
        <span slot="no-results"></span>
      </infinite-loading>
    </div>
    <!--<b-pagination align="center" size="md" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getPostList(cPage-1)"></b-pagination>-->
  </div>
</template>
<script>
  import {BootstrapVueIcons   } from 'bootstrap-vue'
  import 'highlight.js/styles/monokai-sublime.css'
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    name : "Post",
    components : {
      InfiniteLoading
    },
    data : function() {
      return {
        state: null,
        searchFilter: null,
        sectionLists : [],
        hashLists : [],
        tCount : 0,
        cPage : 0,
        size : 9,
        isMoreBtn: false,
        searchHashTag: null
      }
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
        this.cPage = 0;
        this.searchHashTag = tag;
        this.$nextTick(() =>{
          this.infiniteHandler(this.state);
          this.$refs.infiniteLoading.stateChanger.reset();
          this.sectionLists = []
        });
      },
      onSearchByFilter() {
        this.cPage = 0;
        this.$nextTick(() => {
          this.infiniteHandler(this.state);
          this.$refs.infiniteLoading.stateChanger.reset();
          this.sectionLists = []
        });
      },
      infiniteHandler($state) {
        this.state = $state;
        // 자동은 안되서 수동으로 적용
        // 세션 text를 불러온다.
        this.$nextTick(() => {
          this.$http.get(process.env.ROOT_API + "/grepiu/post", {
            params: {
              currentPage: this.cPage++,
              size: this.size,
              hashTags: this.searchHashTag,
              filter: this.searchFilter
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
            console.log("e : "+e);
            //todo 오류 alter
          });
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
<style type="text/css">
  .material-design-icon.icon-2x > .material-design-icon__svg {
    height: 2em;
    width: 2em;
  }
</style>
