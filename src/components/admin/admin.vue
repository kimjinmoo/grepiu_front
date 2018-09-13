<template>
  <div class="container-fluid">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="POST" active>
          <div v-for="(item) in sectionLists" :key="item.id">
            <h4><router-link :to="{ name : 'Admin-Detail', params : {id : item.id }}">{{item.subject}}</router-link><b-button @click="onDelete(item.id)" variant="danger" class="ml-2">삭제</b-button></h4>
          </div>
          <b-pagination align="center" size="md" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getList(cPage-1)"></b-pagination>
          page : {{cPage}}
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
            <vue-editor id="editor-container" v-model="editor.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
          </div>
          <div align="right" style="margin-top: 5pt">
            <b-button variant="success" @click="onCreate">등록</b-button>
          </div>
        </b-tab>
        <b-tab title="#구분">
          <div v-for="(item) in sectionLists" :key="item.id">
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
  import { VueEditor, Quill} from 'vue2-editor'

  export default {
    name: "Post",
    components : {
      VueEditor
    },
    data : function(){
      return {
        editor : {
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
        sectionLists: []
      }
    },
    methods : {
      initEditor : function() {
        this.editor.content = "";
        this.editor.subject = "";
      },
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('file', file)

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
      onCreate : function() {
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
            this.getList(0);
          }
        }).catch((e)=>{
          //console.log(e);
        })
      },
      onDelete : function(id) {
        this.$http.delete(process.env.ROOT_API+"/grepiu/post/"+id)
        .then((r)=> {
          this.getList(0);
        })
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
        }).catch(()=>{

        });
      }
    },
    created : function() {
      this.$http.get(process.env.ROOT_API+"/grepiu/post/hash").then(r=>{
        for (var index in r.data) {
          var obj = {};
          obj['value'] = r.data[index].name;
          obj['text'] = r.data[index].name;
          this.editor.hashTag_options.push(obj);
        }
      })
      this.getList(this.cPage);
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
