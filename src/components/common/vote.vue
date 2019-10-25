<template>
  <div class="container">
   투표
    <div>
      <div>{{vote.subject}}</div>
      <div>{{vote.contents}}</div>
      <div v-for="(q, index) in vote.items" :key="q.item">
        {{q.item}}
        <b-progress  @click.native="onVote(index)">
          <b-progress-bar :max="voteMax()" :value="q.vote" variant="success" style="cursor: pointer">{{q.vote}}</b-progress-bar>
        </b-progress>
      </div>
    </div>
  </div>
</template>
<script>
  import SockJS from 'sockjs-client'
  import Stomp from 'webstomp-client'

  export default {
    name: "Vote",
    data : function() {
      return {
        id: 0,
        connected: false,
        vote: {
          subject: "",
          contents: "",
          items: []
        }
      }
    },
    created() {
      //set ID
      this.id = this.$route.params.id
      //Web Socket Set
      this.socket = new SockJS('http://192.168.0.66:8010/ws')
      this.stompClient = Stomp.over(this.socket, {
        debug : false
      });
      this.stompClient.connect({}, ()=>{
        this.connected = true;
        this.stompClient.subscribe("/topic/vote/"+this.id, (tick) => {
          this.onLoad()
          //JSON.parse(tick.body).message;
        })
      },(error) => {
        //console.log(error);
      })
      // load 투표
      this.onLoad()
    },
    methods : {
      test() {
        this.$http.post(process.env.ROOT_API+"/grepiu/lab/vote/"+this.id, null, {
              params: {
                voteIndex: index
              }
      },
      onVote: function(index) {
        this.$http.post(process.env.ROOT_API+"/grepiu/lab/vote/"+this.id, null, {
          params: {
            voteIndex: index
          }
        }).then((res)=>{
          this.onLoad()
        }).catch((e)=>{
          //console.log(e);
        });
      },
      voteMax() {
        return this.vote.items.reduce((a, b) => {
          return a + b.vote
        }, 0);
      },
      onLoad: function() {
        this.$http.get(process.env.ROOT_API+"/grepiu/lab/vote/"+this.id).then((res)=>{
          this.vote = res.data;
        }).catch((e)=>{
          //console.log(e);
        });
      }
    }
  };
</script>
