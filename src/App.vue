<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" variant="write" v-scroll="scrollHandler">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/" >GrepIU</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse" right>
        <b-navbar-nav>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item v-if="menu.requiresAuth==false" :to="menu.url" v-for="menu in menuLists"
                      v-bind:key="menu.id">{{menu.name}}
          </b-nav-item>
          <b-nav-item v-if="isLogin && menu.requiresAuth==true" :to="menu.url" v-for="menu in menuLists"
                      v-bind:key="menu.id">{{menu.name}}
          </b-nav-item>
          <b-nav-item to="/search">Search</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content" v-b-popover.hover="'I am popover content!'" title="Popover Title">
              <span v-if="!isLogin">계정</span>
              <span v-else>{{u.email}}</span>
            </template>
            <b-nav-item v-if="!isLogin" to="/signIn">로그인</b-nav-item>
            <b-nav-item v-if="!isLogin">도움말</b-nav-item>
            <b-nav-item v-if="isLogin" to="/member/account">계정수정</b-nav-item>
            <b-nav-item v-if="isLogin" v-on:click="signOut">로그아웃</b-nav-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main role="main">
      <router-view></router-view>
    </main>
    <!-- Footer -->
    <homeFooter></homeFooter>
    <!-- 소켓알람-->
    <b-modal ref="alertModar" centered title="알림" ok-only>
      {{socketMessage}}
    </b-modal>
  </div>
</template>
<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import axios from 'axios'
  import firebase from 'firebase'
  import homeFooter from '@/components/main/footer'
  import SockJS from 'sockjs-client'
  import Stomp from 'webstomp-client'

  export default {
    name: 'app',
    components : {
      homeFooter
    },
    directives : {
      scroll : {
        inserted : function(el, binding) {
          let f = function(evt) {
            if(binding.value(evt, el)) {
              window.removeEventListener('scroll', f)
            }
          }
          window.addEventListener('scroll', f);
        }
      }
    },
    data : function() {
      return {
        searchMode : false,
        u : {},
        isLogin : false,
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
    methods: {
      onSearch : function() {
        this.$router.push("/search")
      },
      onFocusSearch : function() {
        console.log("onFocus");
        this.searchMode = true;
      },
      onBlurSearch : function() {
        console.log("onBlur");
        this.searchMode = false;
      },
      send : function() {
        if (this.stompClient && this.stompClient.connected) {
          this.stompClient.send('/app/chat', this.send_message, {})
        }
      },
      connect : function() {
        this.socket = new SockJS('https://conf.grepiu.com/ws');
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect({}, ()=>{
          this.connected = true;
          this.stompClient.subscribe("/topic/messages", (tick) => {
            this.socketMessage = JSON.parse(tick.body).message;
            this.$refs.alertModar.show();
          })
        },(error) => {
          console.log(error);
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
        if(window.scrollY > 80) {
          this.isMenuHide = true;
        } else {
          this.isMenuHide = false;
        }
        console.log(this.isMenuHide);
      },
      showLoading : function(is) {
        this.isLoading = is;
      },
      loginProc : function(user) {
        //this.show = false;
        if(user) {
          this.u = user;
          this.isLogin = true;
          // 웹소켓 접속
          this.connect();
        } else {
          this.disconnect();
          this.isLogin = false;
        }
      },
      signOut : function() {
        firebase.auth().signOut().then(()=>{
          this.isLogin = false;
        });
      }
    },
    beforeCreate : function() {
      // get Menu
      axios.get("/static/fake/headMenu.json")
      .then((response) => {
        this.menuLists = response.data.menuLists;
      })
      .catch(() => {
        // console.log("err");
      })
    },
    mounted : function() {
      // Firebase Auth
      firebase.auth().onAuthStateChanged(this.loginProc);
    }
  }
</script>
<style>
  body {
    background-color: #fefefe;
  }
  .search {
    background: url('/static/img/icon_search.png') left no-repeat;
    padding-left: 30px;
  }
</style>
