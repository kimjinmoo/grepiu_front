<template>
  <div class="container">
    <div v-for="(item, index) in votes" :key="item.id">
      <div>{{item.subject}}</div>
      <div>{{item.contents}}</div>
      <div v-for="(q, index) in item.items" :key="q.item">
        {{q.item}}
        <b-progress  @click.native="onVote(item.id, index)">
          <b-progress-bar :max="voteMax(item.id)" :value="q.vote" variant="success" style="cursor: pointer">{{q.vote}}</b-progress-bar>
        </b-progress>
      </div>
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
