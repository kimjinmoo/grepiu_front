<template>
  <div class="container">
    <div class="m-3"></div>
    <div v-for="(item, index) in votes" :key="item.id" class="mb-2">
      <div>주제 : {{item.subject}} <b-button size="sm" variant="outline-primary">공유하기</b-button> <b-button :to="{path: '/share/'+item.id}" size="sm" variant="outline-info">확인하기</b-button></div>
      <div>내용 : {{item.contents}}</div>
      <div v-for="(q, index) in item.items" :key="q.item">
        {{q.item}}
        <b-progress  @click.native="onVote(item.id, index)">
          <b-progress-bar :max="voteMax(item.id)" :value="q.vote" variant="success" style="cursor: pointer">{{q.vote}}</b-progress-bar>
        </b-progress>
        <br>
      </div>
      <div>총 투표자 : {{voteMax(item.id)}}</div>
    </div>
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
    width: 50%;
    margin: 5px;
  }
</style>
