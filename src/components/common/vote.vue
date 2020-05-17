<template>
  <div class="container">
    <b-list-group>
      <b-list-group-item>
        투표 <span>총 투표자 : {{voteMax()}}</span>
        <div>
          <h2>{{vote.subject}}</h2>
          <p>{{vote.contents}}</p>
          <hr class="my-4">
          <div v-for="(q, index) in vote.items" :key="q.item">
            {{q.item}}
            <b-progress  @click.native="onVote(index)">
              <b-progress-bar :max="voteMax()" :value="q.vote" variant="success" style="cursor: pointer">{{q.vote}}</b-progress-bar>
            </b-progress>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
    <p>by GrepIU</p>
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
      this.socket = new SockJS('https://conf.grepiu.com/ws')
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
      voteMax() {
        return vote.items.reduce((a, b) => {
          return a + b.vote
        }, 0);
      },
      test() {
        this.$http.post(process.env.ROOT_API+"/grepiu/lab/vote/"+this.id, null, {
          params: {
            voteIndex: index
          }
        })
      },
      onVote(index) {
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
<style type="text/css">
  .progress {
    width: 90%;
    cursor: pointer;
  }
</style>
