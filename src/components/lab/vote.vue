<template>
  <div class="container">
    <div class="m-2">
      <div>*자신의 ID를 잘 보관하여 주세요. 리스트에는 max 10개까지만 나옵니다.</div>
      <b-form-group
        label="주제"
        label-for="subject"
        description="투표 주제를 입력합니다."
      >
        <b-form-input
          ref="subject"
          id="subject"
          v-model="form.subject"
          type="text"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="상세 내역"
        label-for="contents"
        description="투표 상세 내역을 작성합니다."
      >
        <b-form-input
          ref="contents"
          id="contents"
          v-model="form.contents"
          type="text"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="투표 내용"
        label-for="vote"
      >
        <b-button size="sm" variant="primary" @click="addVoteRow" ref="addVote">+</b-button>
        <b-input-group class="mt-1" v-bind:key="input.key" v-for="(input, index) in form.items">
          <b-form-input
            id="vote"
            type="text"
            class="m-1"
            v-model="input.item"
          />
          <b-input-group-append>
            <b-button size="sm" variant="danger" @click="deleteVoteRow(index)">-</b-button>
          </b-input-group-append>
        </b-input-group>


      </b-form-group>

      <b-button size="sm" variant="primary" @click="onVoteSave">등록</b-button>
    </div>
    <hr class="my-4">
    <b-list-group>
      <b-list-group-item v-for="(item, index) in votes" :key="item.id">
        <h2>{{item.subject}}</h2>
        <p>{{item.contents}}</p>
        <hr class="my-4">

        <div v-for="(q, index) in item.items" :key="q.item">
          {{q.item}}
          <b-progress  @click.native="onVote(item.id, index)">
            <b-progress-bar :max="voteMax(item.id)" :value="q.vote" variant="success">{{q.vote}}</b-progress-bar>
          </b-progress>
          <br>
        </div>
        <div>총 투표자 : {{voteMax(item.id)}}</div>
        <br>
        <span>
        <b-button size="sm" variant="outline-primary" @click="onCopyClip(item.id)">공유하기(iframe)</b-button>
        <b-button size="sm" variant="outline-primary" @click="onCopyUrl(item.id)">URL 복사</b-button>
        </span>
      </b-list-group-item>
    </b-list-group>
    <div style="height:15px;"></div>
  </div>
</template>
<script>
  import SockJS from 'sockjs-client'
  import Stomp from 'webstomp-client'

  export default {
    name: 'vote',
    props: ['userInfo'],
    data() {
      return {
        shareClip: '<iframe src="'+process.env.WEB_URL+'/share/$id$" height="100%" width="100%" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"/>',
        votes: [],
        form: {
          subject: '',
          contents: '',
          items: []
        }
      }
    },
    created() {
      //Web Socket Set
      this.socket = new SockJS('https://conf.grepiu.com/ws');
      this.stompClient = Stomp.over(this.socket, {
        debug : false
      });
      this.stompClient.connect({}, ()=>{
        this.connected = true;
        this.stompClient.subscribe("/topic/vote", (tick) => {
          this.onLoad()
          //JSON.parse(tick.body).message;
        })
      },(error) => {
        //console.log(error);
      })
      this.onLoad()
    },
    methods: {
      initInput : function() {
        this.form = {
          subject: '',
          contents: '',
          items: []
        }
      },
      addVoteRow: function() {
        this.form.items.push({
          item: ""
        });
      },
      deleteVoteRow: function(idx) {
        this.form.items.splice(idx,1);
      },
      onVoteSave: function() {
        // 벨리데이션
        if(this.form.subject.length < 1) {
          this.$refs.subject.focus();
          return false;
        }
        if(this.form.contents.length < 1) {
          this.$refs.contents.focus();
          return false;
        }
        if(this.form.items.length < 1) {
          this.$refs.addVote.focus();
          return false;
        }
        this.form.items.forEach(v=>{
          if(v.item.length < 1) {
            this.$refs.addVote.focus();
            return false;
          }
        })
        this.$http.post(process.env.ROOT_API+"/grepiu/lab/vote", this.form).then((res)=>{
          // 초기화
          this.initInput();
          this.onLoad();
        }).catch((e)=>{
          //console.log(e);
        });
      },
      voteMax(id) {
        let detail = this.votes.filter(o => (o.id == id))[0]
        return detail.items.reduce((a, b) => {
          return a + b.vote
        }, 0);
      },
      onCopyClip: function(id) {
        this.$copyText(this.shareClip.replace("$id$",id)).then(function(e) {
          alert('복사 되었습니다.')
        });
      },
      onCopyUrl: function(id) {
        this.$copyText(process.env.WEB_URL+`/share/${id}`).then(function(e) {
          alert('복사 되었습니다.')
        });
      },
      onVote: function(id, index) {
        this.$http.post(process.env.ROOT_API+"/grepiu/lab/vote/"+id, null, {
          params: {
            voteIndex: index
          }
        }).then((res)=>{
          this.onLoad()
        }).catch((e)=>{
          //console.log(e);
        });
      },
      onLoad: function() {
        this.$http.get(process.env.ROOT_API+"/grepiu/lab/vote").then((res)=>{
          this.votes = res.data.reverse();
        }).catch((e)=>{
          //console.log(e);
        });
      }
    }
  }
</script>
<style type="text/css">
  .progress {
    width: 90%;
    cursor: pointer;
  }
</style>
