<template>
  <div class="container-fluid">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="POST" active>
          <div v-for="(item) in sectionLists" :key="item.id">
            <h3><router-link :to="{ name : 'AdminView', params : {id : item.id }}">{{item.subject}}</router-link><b-button @click="onDelete(item.id)">삭제</b-button></h3>
          </div>
          <b-pagination align="center" size="md" :total-rows="tCount" v-model="cPage" :per-page="size" @input="getList(cPage-1)"></b-pagination>
          page : {{cPage}}
        </b-tab>
        <b-tab title="Post 쓰기">
          <b-alert :show="editor.alert">등록되었습니다.</b-alert>
          <b-form-input v-model="editor.subject"
                        type="text"
                        placeholder="제목을 입력하여주십시요."></b-form-input>
          <div style="margin-top: 5pt">
            <b-form-select v-model="editor.category_selected" :options="editor.category_options" class="mb-3" size="sm" />
          </div>
          <div style="margin-top: 5pt">
            <vue-editor v-model="editor.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
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
          editorSettings: {
            modules: {
              imageDrop: true,
              imageResize: {}
            }
          },
          category_selected : "lab",
          category_options: [
            {value: "lab", text: "Lab"},
            {value: "post", text: "Post"}
          ],
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
          "category" : this.editor.category_selected,
          "content" : this.editor.content,
          "regId" : this.$store.getters.user.id
        }).then(() => {
          this.initEditor();
          this.editor.alert=true;
          this.getList(0);
        }).catch((e)=>{
          //console.log(e);
        })
      },
      onDelete : function(id) {
        this.$http.delete(process.env.ROOT_API+"/grepiu/post/"+idsss)
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
      this.getList(this.cPage);
    }
  }
</script>
