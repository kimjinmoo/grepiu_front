<template>
  <div class="container-fluid">
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col md="2">
          <!-- 영역 1-->
          <div>메뉴 목록</div>
        </b-col>
        <b-col md="8">
          <div class="ql-snow">
            <div v-for="(item) in posts" :key="item.id" class="post ql-editor" >
              <h1 :id="item.id" class="text-dark">{{item.subject}}</h1>
              <div v-html="item.content"></div>
              <div>
                <p class="text-left" v-html="item.h"></p>
              </div>
              <p class="text-black-50 text-sm-right small">{{item.regId}}/{{item.modifyDate | moment("YYYY-MM-DD HH:mm")}}</p>
              <div class="dropdown-divider"></div>
            </div>
          </div>
        </b-col>
        <b-col md="2">
          <!-- 여역 3-->
        </b-col>
      </b-row>
    </b-container>
    <b-pagination align="center" size="md" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getList(cPage-1)"></b-pagination>
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
        size : 4
      }
    },
    created : function() {
      // post를 불러온다.
      this.getList(this.cPage);
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
