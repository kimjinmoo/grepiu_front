<template>
  <div class="container-fluid">
    <b-container fluid>
      <div class="container">
        <div class="ql-snow">
          <div v-for="(item) in sectionLists" :key="item.id" class="post ql-editor" >
            <h1 :id="item.id" class="text-dark">{{item.subject}}</h1>
            <div v-html="item.content"></div>
            <p>(최종수정:{{item.modifyDate | moment("YYYY-MM-DD HH:mm")}})</p>
          </div>
        </div>

        <b-pagination align="center" size="md" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getList(cPage-1)"></b-pagination>
        <!--<div align="row">-->
          <!--<div class="col-xs-4">-->
            <!--<b-btn v-on:click="prevPost" v-if="this.cPage > 0">이전</b-btn>-->
          <!--</div>-->
          <!--<div class="col-xs-4 text-right">-->
            <!--<b-btn v-on:click="nextPost" v-if="this.cPage < this.tCount-1">다음</b-btn>-->
          <!--</div>-->
        <!--</div>-->
        <br>
      </div>
    </b-container>
  </div>
</template>
<script>
  export default {
    name : "Lap",
    data : function() {
      return {
        sectionLists : [],
        tCount : 0,
        cPage : 0,
        size : 1
      }
    },
    created : function() {
      // post를 불러온다.
      this.getList(this.cPage);
    },
    computed : {
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
      getList : function(page) {
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

        });
      },
      prevPost : function() {
        this.getList(--this.cPage);
      },
      nextPost : function() {
        this.getList(++this.cPage);
      }
    }
  }
</script>
