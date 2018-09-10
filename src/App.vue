<template>
  <div id="app" class="app">
    <div class="wrapper">
      <transition name="fade">
      <b-navbar toggleable="md" type="light" variant="write" v-bind:class="{fixedNav:isMenuHide}">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/" >GrepIU</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse" right>
          <b-navbar-nav>
            <b-nav-item to="/about">관하여..</b-nav-item>
            <b-nav-item v-if="menu.requiresAuth==false" :to="menu.url" v-for="menu in menuLists"
                        v-bind:key="menu.id">{{menu.name}}
            </b-nav-item>
            <b-nav-item v-if="userIsAuthenticated && menu.requiresAuth==true" :to="menu.url" v-for="menu in menuLists"
                        v-bind:key="menu.id">{{menu.name}}
            </b-nav-item>
            <b-nav-item to="/search">검색</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template slot="button-content" v-b-popover.hover="'I am popover content!'" title="Popover Title">
                <span v-if="!userIsAuthenticated">계정</span>
                <span v-else>{{user.id}}</span>
              </template>
              <b-nav-item v-if="!userIsAuthenticated" to="/signIn">로그인</b-nav-item>
              <b-nav-item v-if="!userIsAuthenticated">도움말</b-nav-item>
              <b-nav-item v-if="userIsAuthenticated" to="/member/account">계정정보</b-nav-item>
              <b-nav-item v-if="userIsAuthenticated" v-on:click="signOut">로그아웃</b-nav-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      </transition>
      <GrepIUNav></GrepIUNav>
      <main role="main" style="margin-top: 1rem">
        <router-view></router-view>
      </main>
      <div class="inner_footer_margin"></div>
    </div>
    <!-- Footer -->
    <GrepIUFooter class="footer"></GrepIUFooter>
    <!-- 소켓알람-->
    <b-modal ref="alertModar" centered title="알림" ok-only>
      {{socketMessage}}
    </b-modal>
  </div>
</template>
<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import SockJS from 'sockjs-client'
  import Stomp from 'webstomp-client'
  import GrepIUNav from '@/components/main/gnav'
  import GrepIUFooter from '@/components/main/footer'

  export default {
    name: 'app',
    components : {
      GrepIUFooter, GrepIUNav
    },
    data : function() {
      return {
        // isLogin : false,
        isMenuHide : false,
        menuLists: [],
        isLoading : false,
        label : '데이터를 읽고 있습니다.',
        socketMessage : ""
      }
    },
    watch : {

      // '$route' (to, from) {
      // }
    },
    computed : {
      user() {
        return this.$store.getters["grepiu/getUser"]
      },
      userIsAuthenticated () {
        return this.$store.getters["grepiu/getUser"]!== null && this.$store.getters["grepiu/getUser"] !== undefined
      }
    },
    methods: {
      onScroll:function(e, position){
        this.position = position;
      },
      send : function() {
        if (this.stompClient && this.stompClient.connected) {
          this.stompClient.send('/app/chat', this.send_message, {})
        }
      },
      connect : function() {
        this.socket = new SockJS('https://conf.grepiu.com/ws');
        this.stompClient = Stomp.over(this.socket, {
          debug : true
        });
        this.stompClient.connect({}, ()=>{
          this.connected = true;
          this.stompClient.subscribe("/topic/messages", (tick) => {
            this.socketMessage = JSON.parse(tick.body).message;
            this.$refs.alertModar.show();
          })
        },(error) => {
          //console.log(error);
          this.connected =false;
        })
      },
      disconnect () {
        if (this.stompClient) {
          this.stompClient.disconnect()
        }
        this.connected = false
      },
      tickleConnection () {
        this.connected ? this.disconnect() : this.connect()
      },
      scrollHandler : function() {
        // if(window.scrollY > 80) {
        //   this.isMenuHide = true;
        // } else {
        //   this.isMenuHide = false;
        // }
        //console.log(this.isMenuHide);
      },
      showLoading : function(is) {
        this.isLoading = is;
      },
      loginProc : function(user) {
        //this.show = false;
        if(user) {
          // 웹소켓 접속
          this.connect();
        } else {
          this.disconnect();
        }
      },
      signOut : function() {
        this.$store.dispatch("grepiu/logout")
        this.$router.push("/")
      }
    },
    beforeCreate : function() {
      if(window.console) {
        console.log('%c GrepIU', [
          'font-family: "sans-serif";',
          'font-size: 40px;',
          'color: #dc006c',
          'text-align: center',
          'font-weight: bold'
        ].join(';'));
      }
      // get Menu
      this.$http.get("/static/fake/headMenu.json")
      .then((response) => {
        this.menuLists = response.data.menuLists;
      })
      .catch(() => {
        // console.log("err");
      })
    }
  }
</script>
<style scoped>
  .fixedNav {
    background-color: white;
    border-style: none none solid none;
    border-width: 1px;
    border-color: #0b2e13
  }
</style>
