<template>
  <div class="container-fluid grepIU_container">
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="상세보기" active>
            <div class="m-lg-1">
              <b-form-input v-model="subject"
                            type="text"
                            placeholder="제목을 입력하여주십시요."></b-form-input>
            </div>
            <div>
              <b-form-group label="#Hash">
                <b-form-checkbox-group id="hashTag" name="hashTag" v-model="hashTag" :options="hashTag_options">
                </b-form-checkbox-group>
              </b-form-group>
            </div>
            <vue-editor id="editor-container" v-model="content" @imageAdded="handleImageAdded" :editorOptions="editorOptions"></vue-editor>
            <b-alert :show="alert">수정되었습니다.</b-alert>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div class="mt-2 mb-2 text-right">
      <b-button-group>
        <b-button variant="dark" @click="onList" class="mr-2">목록</b-button>
        <b-button variant="success" @click="onModify">수정</b-button>
      </b-button-group>
    </div>
  </div>
</template>
<script>
  /**
   *
   * Vue Editor
   * https://www.npmjs.com/package/vue2-editor
   *
   */
  import hljs from 'highlight.js'
  import 'highlight.js/styles/monokai-sublime.css'
  import { VueEditor } from 'vue2-editor'


  export default {
    name: 'Admin-Detail',
    components: {
      VueEditor
    },
    data : function() {
      return {
        alert : false,
        id : "",
        subject : "",
        content : "",
        hashTag : [],
        hashTag_options: [],
        editorOptions: {
          modules: {
            syntax: {
              highlight: text =>
                hljs.highlightAuto(text).value
            }
          }
        },
        editorSettings: {
          modules: {
            imageDrop: true,
            imageResize: {}
          }
        }
      }
    },
    methods : {
      onList : function() {
        this.$router.push("/admin");
      },
      onModify : function() {
        this.$http.put(process.env.ROOT_API+"/grepiu/post/"+this.$route.params.id, {
          "subject" : this.subject,
          "hashTag" : this.hashTag,
          "content" : this.content,
          "modifyId" : this.$store.getters["grepiu/getUser"].id
        }).then((res) => {
          if(res.data.code == 400) {
            alert(res.data.message);
          } else {
            this.alert = true;
          }
        }).catch((e)=>{
          //console.log(e);
        })
      },
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('file', file)

        this.$http.post(process.env.ROOT_API+'/api/ver1/upload/file', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((result) => {
          let url = "http://data.grepiu.com/"+result.data.fileName // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
          resetUploader();
        })
        .catch((err) => {
          //console.log(err);
        })
      },
    },
    created : function(){
      this.$http.get(process.env.ROOT_API+"/grepiu/post/hash").then(r=>{
        for (var index in r.data) {
          var obj = {};
          obj['value'] = r.data[index].name;
          obj['text'] = r.data[index].name;
          this.hashTag_options.push(obj);
        }
      })
      this.$http.get(process.env.ROOT_API+"/grepiu/post/"+this.$route.params.id).then((r)=>{
        this.id = r.data.post.id;
        if(r.data.post.hashTag != null)  this.hashTag = r.data.post.hashTag;
        this.content = r.data.post.content;
        this.subject = r.data.post.subject;
      }).catch(function(e){
        //console.log(e);
      })
    }
  };
</script>
<style type="text/css">
  #editor-container {
    min-height: 20rem;
    width: 100%;
  }
</style>

