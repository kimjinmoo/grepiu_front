<template>
  <div class="container-fluid grepIU_container">
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="문의하기" active>
            <div class="m-lg-1">
              <b-form-select v-model="selected" :options="options"></b-form-select>
            </div>
            <div class="m-lg-1">
              <b-form-input v-model="subject"
                            type="text"
                            placeholder="제목을 입력하여주십시요."></b-form-input>
              <b-form-input v-model="email"
                            type="text"
                            placeholder="연락 받을 이메일을 입력하여주십시요."></b-form-input>
            </div>
            <vue-editor id="editor-container" v-model="content"
                        :editorOptions="editorOptions"></vue-editor>
            <b-alert :show="alert">요청되었습니다.</b-alert>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div class="mt-2 mb-2 text-right">
      <b-button-group>
        <b-button variant="success" @click="requestSupport">문의하기</b-button>
      </b-button-group>
    </div>
  </div>
</template>
<script>
import {VueEditor} from 'vue2-editor'
import hljs from 'highlight.js'

export default {
  name: 'Support',
  components: {
    VueEditor
  },
  data: function () {
    return {
      id: '',
      subject: '',
      email: '',
      content: '',
      alert: false,
      options: [
        {value: 'grepIU_HOME', text: 'GrepIU 홈페이지 문의'},
        {value: 'grep_Search_app', text: '"Grep Search App" 문의'},
        {value: 'grep_facee_app', text: '"우리 어때" 문의'}
      ],
      selected: 'grepIU_HOME',
      editorOptions: {
        modules: {
          syntax: {
            highlight: text =>
              hljs.highlightAuto(text).value
          }
        }
      },
    }
  },
  methods: {
    requestSupport: function () {
      if (this.subject === '') {
        alert('제목을 입력하세요')
      }
      if (this.email === '') {
        alert('이메일을 입력하세요')
      }
      if (this.content === '') {
        alert('내용을 입력하세요')
      }
      const params = {
        'type': this.selected,
        'subject': this.subject,
        'content': this.content,
        'email': this.email
      }
      // api 생성 후 진행
      //this.$http.post(process.env.ROOT_API + '/grepiu/support', {data: params})
      // success request
      this.alert = true
    }
  }
}
</script>
<style type="text/css">
#editor-container {
  min-height: 20rem;
  width: 100%;
}
</style>
