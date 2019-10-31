<template>
  <div class="container">
    <div class="m-2">
      <b-button size="sm" variant="primary">등록</b-button>
    </div>
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
    data() {
      return {
        shareClip: '<iframe src="'+process.env.WEB_URL+'/share/$id$" height="100%" width="100%" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"/>',
        votes: []
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
    computed: {
    },
    methods: {
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
          this.votes = res.data;
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
