<template>
  <div class="container-fluid">
    <b-container fluid>
      <div align="center">
        <h2>작성한 글</h2>
      </div>
      <div>
        <div v-for="(item) in sectionLists" :key="item.id" class="post" >
          <h2 :id="item.id" class="text-dark">{{item.subject}}-(최종수정:{{item.modifyDate}})</h2>
          <div v-html="item.content"></div>
        </div>
      </div>
      <b-list-group>
        <b-list-group-item>글 List</b-list-group-item>
        <b-list-group-item :href="'#'+item.id" class="small" v-for="(item) in sectionLists" :key="item.id">{{item.subject}}</b-list-group-item>
      </b-list-group>
      <div>
        <b-pagination align="center" size="sm" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getList(cPage-1)"></b-pagination>
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
        size : 15
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
        console.log('change', val)
      },
      handleSlideClick : function(dataset) {
        console.log(dataset.index, dataset.name);
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
      }
    }
  }
</script>
