<template>
  <div class="container-fluid">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="상세보기" active>

          <b-form-input v-model="subject"
                        type="text"
                        placeholder="제목을 입력하여주십시요."></b-form-input>
          <br>
          <b-form-select v-model="category" :options="category_options" class="mb-3" size="sm" />
          <vue-editor v-model="content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
          <b-alert :show="alert">수정되었습니다.</b-alert>
          <div align="right" style="margin-top: 5pt">
            <b-button variant="success" @click="onModify">수정</b-button>
          </div>
          <b-button @click="onList">목록</b-button>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
  /**
   *
   * Vue Editor
   * https://www.npmjs.com/package/vue2-editor
   *
   */
  import axios from 'axios'
  import { VueEditor} from 'vue2-editor'

  export default {
    name: 'PostView',
    components: {
      VueEditor
    },
    data : function() {
      return {
        category : "lab",
        category_options: [
          {value: "lab", text: "Lab"},
          {value: "post", text: "Post"}
        ],
        alert : false,
        id : "",
        subject : "",
        content : "",
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
        this.$router.push("/post");
      },
      onModify : function() {
        axios.put("https://conf.grepiu.com/sample/post/"+this.$route.params.id, {
          "subject" : this.subject,
          "category" : this.category,
          "content" : this.content,
          "regId" : ""
        }).then(() => {
          this.alert = true;
        }).catch((e)=>{
          console.log(e);
        })
      },
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('file', file)

        axios.post('https://conf.grepiu.com/sample/upload/file', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((result) => {
          let url = "http://data.grepiu.com/"+result.data.fileName // Get url from response
          console.log(url);
          Editor.insertEmbed(cursorLocation, 'image', url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        })
      },
    },
    created : function(){
      axios.get("https://conf.grepiu.com/sample/post/"+this.$route.params.id).then((r)=>{
        console.log("d: " + JSON.stringify(r.data))
        this.id = r.data.id;
        this.category = r.data.category;
        this.content = r.data.content;
        this.subject = r.data.subject;
      }).catch(function(e){


        console.log(e);
      })
    }
  };
</script>