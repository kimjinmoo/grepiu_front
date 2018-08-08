<template>
  <div class="container-fluid">
    <b-container fluid>
      <div>
        <div v-for="(item) in sectionLists" :key="item.id" class="post" >
          <h1 :id="item.id" class="text-dark">{{item.subject}}</h1>
          <div v-html="item.content"></div>
          <p>(최종수정:{{item.modifyDate | moment("YYYY-MM-DD HH:mm")}})</p>
        </div>
        <div align="center mx-auto">
          <b-button-group class="mx-1">
            <b-btn v-on:click="prevPost" v-if="this.cPage > 0">&lsaquo;</b-btn>
          </b-button-group>
          <b-button-group class="mx-1">
            <b-btn v-on:click="nextPost" v-if="this.cPage < this.tCount-1">&rsaquo;</b-btn>
          </b-button-group>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
  import axios from 'axios'

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
      // '$refs.carousel.currentPage' : function() {
      //   console.log("watch!!");
      //   if (this.currentPage !== this.$refs.carousel.currentPage) {
      //     console.log(this.currentPage);
      //   }
      // }
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
        axios.get("https://conf.grepiu.com/sample/post",{
          params : {
            currentPage : page,
            size : this.size
          }
        })
        .then((response) => {
          this.sectionLists = response.data.list;
          this.tCount = response.data.tCount;
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
