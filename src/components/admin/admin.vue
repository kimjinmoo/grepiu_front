<template>
  <div class="container-fluid">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="POST" active>
          <b-table responsive  :items="sectionLists" :fields="fields" class="small">
            <template slot="subject" slot-scope="post">
              <router-link :to="{ name : 'AdminDetail', params : {id : post.item.id }}">{{post.value}}</router-link>
            </template>
            <template slot="regDate" slot-scope="post">
              {{post.item.regDate|moment("YYYY-MM-DD HH:mm")}}
            </template>
            <template slot="delete" slot-scope="post">
              <b-button @click="onDelPostBtn(post.item.id)" variant="danger" size="sm" class="mr-2">삭제</b-button>
            </template>
          </b-table>
          <b-pagination align="center" size="md" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getPostList(cPage-1)"></b-pagination>
        </b-tab>
        <b-tab title="Post 쓰기">
          <b-alert :show="editor.alert">등록되었습니다.</b-alert>
          <b-form-input v-model="editor.subject"
                        type="text"
                        placeholder="제목을 입력하여주십시요."></b-form-input>
          <div>
            <b-form-group label="#Hash">
            <b-form-checkbox-group id="hashTag" name="hashTag" v-model="editor.hashTag_selected" :options="editor.hashTag_options">
            </b-form-checkbox-group>
            </b-form-group>
            <!--<b-form-select v-model="editor.category_selected" :options="editor.category_options" class="mb-3" size="sm" />-->
          </div>
          <div>
            <vue-editor id="editor-container" v-model="editor.content" useCustomImageHandler @imageAdded="handleImageAdded" :editorOptions="editor.editorOptions"></vue-editor>
          </div>
          <div class="m-2">
            <b-button variant="success" @click="onAddPostBtn">등록</b-button>
          </div>
        </b-tab>
        <b-tab title="#해쉬태그">
          <!-- 해쉬 관리-->
          <b-input-group size="mx-auto" class="m-2">
            <b-form-input id="hash" v-model="newHash" size="sm" type="text" placeholder="해쉬태그 명 추가" :state="nameState" aria-describedby="infoLeast"></b-form-input>
            <b-input-group-append>
              <b-button variant="success" @click="onAddHash">등록</b-button>
            </b-input-group-append>
            <b-form-invalid-feedback id="infoLeast">
              적어도 1글자이상 입력해주세요
            </b-form-invalid-feedback>
          </b-input-group>
          <span v-for="(item) in hashLists" class="mr-2">
            {{item.name}}<b-button @click="onDeleteHash(item.name)" size="sm" variant="outline-success" class="m-1">X</b-button>
          </span>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
  import hljs from 'highlight.js'
  import 'highlight.js/styles/monokai-sublime.css'
  import { VueEditor, Quill} from 'vue2-editor'

  export default {
    name: "Admin",
    components : {
      VueEditor
    },
    data : function(){
      return {
        fields: [{
          key: 'id',
          label: 'No',
          class: 'd-none d-lg-block'
        }, {
          key: 'subject',
          label: '제목'
        }, {
          key: 'regDate',
          label: '생성일',
          class: 'd-none d-lg-block'
        }, {
          key: 'delete',
          label: '삭제'
        }
        ],
        editor : {
          editorOptions: {
            modules: {
              syntax: {
                highlight: text =>
                  hljs.highlightAuto(text).value
              }
            }
          },
          toolbarOption:[
            [{ 'font': [] }],
            [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
            [{ 'header': 1 }, { 'header': 2 }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'video', 'formula'],
            [{ 'direction': 'rtl' }],
            ['clean']
          ],
          editorSettings: {
            modules: {
              imageDrop: true,
              imageResize: {}
            }
          },
          hashTag_selected : [],
          hashTag_options: [],
          alert : false,
          subject : "",
          content: ''
        },
        tCount : 0,
        cPage : 0,
        size : 15,
        sectionLists: [],
        hashLists: [],
        newHash: ''
      }
    },
    computed: {
      nameState() {
        return this.newHash.length > 1? true: false
      }
    },
    methods : {
      initEditor : function() {
        this.editor.content = "";
        this.editor.subject = "";
      },
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // 파일
        var formData = new FormData();
        formData.append('file', file)
        // API 호출
        this.$http.post(process.env.ROOT_API+'/api/ver1/upload/file', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((result) => {
          let url = "https://data.grepiu.com/"+result.data.path+result.data.fileName // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
          resetUploader();
        })
        .catch((err) => {
          //console.log(err);
        })
      },
      onAddPostBtn : function() {
        // Post
        this.$http.post(process.env.ROOT_API+"/grepiu/post", {
          "subject" : this.editor.subject,
          "hashTag" : this.editor.hashTag_selected,
          "content" : this.editor.content,
          "regId" : this.$store.getters["grepiu/getUser"].id
        }).then((res) => {
          if(res.data.code == 400) {
              alert(res.data.message)
          } else {
            this.initEditor();
            this.editor.alert=true;
            this.getPostList(0);
          }
        }).catch((e)=>{
          //console.log(e);
        })
      },
      onDelPostBtn : function(id) {
        if(confirm("복구가 불가능합니다. 삭제하시겠습니까?")){
          this.$http.delete(process.env.ROOT_API+"/grepiu/post/"+id)
          .then((r)=> {
            this.getPostList(0);
          })
        }


      },
      onAddHash: function() {
        if(this.nameState)
          this.$http.post(process.env.ROOT_API+"/grepiu/post/hash/",{
            name : this.newHash
          }).then((r)=>{
            this.newHash = "";
            this.initHashList();
          })
      },
      onDeleteHash: function(name) {
        this.$http.delete(process.env.ROOT_API+"/grepiu/post/hash/"+name).then((r)=>{
          this.initHashList();
        })
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

        });
      },
      initHashList: function() {
        this.editor.hashTag_options = [];
        this.$http.get(process.env.ROOT_API+"/grepiu/post/hash").then(r=>{
          for (var index in r.data) {
            var obj = {};
            obj['value'] = r.data[index].name;
            obj['text'] = r.data[index].name;
            this.editor.hashTag_options.push(obj);
          }
        })
        // Hash
        this.$http.get(process.env.ROOT_API+"/grepiu/post/hash").then((res)=>{
          this.hashLists = res.data;
        })
      }
    },
    created : function() {
      this.initHashList();
      this.getPostList(this.cPage);
    }
  }
</script>
<style type="text/css">
  #editor-container {
    height: 20rem;
    width: 100%;
  }

  /*.ql-toolbar {*/
    /*position: fixed;*/
    /*background-color: white;*/
    /*padding: auto;*/
  /*}*/
</style>
