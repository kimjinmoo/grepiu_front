<template>
  <div class="container">
    <div v-for="(item, index) in votes" :key="item.id">
      <div>{{item.subject}}</div>
      <div>{{item.contents}}</div>
      <b-progress v-for="(q, index) in item.items" :key="q.item">
        <b-progress-bar :max="voteMax(item.id)" :value="q.vote" variant="success">{{q.item}} ({{q.vote}})</b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'vote',
    data() {
      return {
        votes: []
      }
    },
    created() {
      this.onLoad();
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
      onLoad: function() {
        console.log("init")
        this.$http.get(process.env.ROOT_API+"/grepiu/lab/vote").then((res)=>{
          this.votes = res.data;
          console.log("d : " + JSON.stringify(res))
        }).catch((e)=>{
          //console.log(e);
        });
      }
    }
  }
</script>
