<template>
  <div id="app" class="app">
    <div class="wrapper">
      <div v-if="!isCommon">
      <transition name="fade">
        <b-navbar  toggleable="md" type="light" variant="write" :class="{'fixed-theme':myNavBar.isFixed,'fixed-off-theme': !myNavBar.isFixed}" class="fixed-top grepIU-underline">
          <b-navbar-toggle target="nav_collapse" ></b-navbar-toggle>
          <b-navbar-brand to="/" :class="{'fixed-theme':myNavBar.isFixed,'fixed-off-theme': !myNavBar.isFixed}">GrepIU</b-navbar-brand>
          <b-collapse is-nav id="nav_collapse" right>
            <b-navbar-nav>
              <b-nav-item to="/about">관하여..</b-nav-item>
              <b-nav-item v-if="menu.requiresAuth==false" :to="menu.url" v-for="menu in menuLists"
                          v-bind:key="menu.id">{{menu.name}}
              </b-nav-item>
              <b-nav-item v-if="userIsAuthenticated && menu.requiresAuth==true && menu.admin==false" :to="menu.url" v-for="menu in menuLists"
                          v-bind:key="menu.id">{{menu.name}}
              </b-nav-item>
              <b-nav-item v-show="user.role=='SUPER_ADMIN'" v-if="userIsAuthenticated && menu.requiresAuth==true && menu.admin==true" :to="menu.url" v-for="menu in menuLists"
                          v-bind:key="menu.id">{{menu.name}}
              </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" :class="{'fixed-theme':myNavBar.isFixed}">
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
      </div>
      <div class="innerPadding" v-if="!isCommon"/>
      <div class="grep-container">
        <GrepIUNav v-if="!isCommon"></GrepIUNav>
        <main role="main">
          <router-view></router-view>
        </main>
        <div class="inner_footer_margin" v-if="!isCommon"></div>
      </div>
    </div>
    <!-- Footer -->
    <GrepIUFooter class="footer" v-if="!isCommon"></GrepIUFooter>
    <!-- 소켓알람-->
    <b-modal ref="alertModar" centered title="알림" ok-only>{{socketMessage}}</b-modal>
  </div>
</template>
<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import GrepIUNav from '@/components/main/gnav'
  import GrepIUFooter from '@/components/main/footer'

  export default {
    name: 'app',
    components : {
      GrepIUFooter, GrepIUNav
    },
    data : function() {
      return {
        scrollPosition: 0,
        isCommon: false,
        myNavBar: {
          isFixed: false,
          flagAdd: true,
          elements: [],
          add: function() {
            if(this.flagAdd) {
              this.isFixed = true
            }
            this.flagAdd = false
          },

          remove: function() {
            this.isFixed = false
            this.flagAdd = true
          }
        },
        // isLogin : false,
        menuLists: [],
        isLoading : false,
        label : '데이터를 읽고 있습니다.'
      }
    },
    watch : {
      socketMessage() {
        this.$refs.alertModar.show();
      },
      $route(to, from) {
        //console.log("route")
      }
    },
    computed : {
      socketMessage() {
        return this.$store.getters["grepiu/getMessage"]
      },
      user() {
        return this.$store.getters["grepiu/getUser"]
      },
      userIsAuthenticated () {
        return this.$store.getters["grepiu/getUser"]!== null && this.$store.getters["grepiu/getUser"] !== undefined
      }
    },
    methods: {
      handleScroll: function(e) {
        let yOffset = 0;
        let currentScroll = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

        if(yOffset < currentScroll) {
          this.myNavBar.add();
        }
        else if(currentScroll == yOffset){
          this.myNavBar.remove();
        }
      },
      prevent (event) {
        event.preventDefault()
        event.stopPropagation()
      },
      onScroll:function(e, position){
        this.position = position;
      },
      send : function() {
        if (this.stompClient && this.stompClient.connected) {
          this.stompClient.send('/app/chat', this.send_message, {})
        }
      },
      showLoading : function(is) {
        this.isLoading = is;
      },
      signOut : function() {
        this.$store.dispatch("grepiu/logout")
        this.$router.push("/")
      }
    },
    beforeCreate : function() {
      // autoLogin
      this.$store.dispatch("grepiu/autoLogin");
      // debug
      let ua = window.navigator.userAgent.toLowerCase();
      let chrome = ua.indexOf("chrome");
      if(window.console && chrome > 0) {
        console.log('%c GrepIU', [
          'font-family: "sans-serif";',
          'font-size: 40px;',
          'color: #dc006c',
          'text-align: center',
          'font-weight: bold'
        ].join(';'));
      } else if(window.console){
        console.log("GrepIU")
      }
      // get Menu
      this.$http.get("/static/fake/headMenu.json")
      .then((response) => {
        this.menuLists = response.data.menuLists;
      })
      .catch(() => {
        // console.log("err");
      })
    },

    created () {
      if(this.$route.path.indexOf("/share/") >= 0) {
        this.isCommon = true;
      }
      console.log();
      // document.body.onscroll = this.handleScroll
      // document.addEventListener("touchmove", this.handleScroll, true)
      document.addEventListener('scroll', this.handleScroll, true)
    },
    destroyed () {
      document.removeEventListener('scroll', this.handleScroll, true)
    }
  }
</script>
<style scoped>

  .innerPadding {
    padding-top: 68px;
  }

  .grep-container {
    height: 100%;
  }
  /*
   * Custom styles
   */
  .navbar-brand {
    font-size: 26px;
  }

  .navbar-container {
    padding: 20px 0 20px 0;
  }
  .fixed-theme {
    font-size: 14px;
    color: #0b2e13;
    background-color: #20c997;
  }
  .fixed-off-theme {
    font-size: 16px;
    color: #0b2e13;
    background-color: white;
  }

  .navbar-brand.fixed-theme {
    font-size: 14px;
  }

  .navbar-brand.fixed-off-theme {
    font-size: 20px;
  }

  .navbar-container.fixed-theme {
    padding: 0;
  }

  .fixed-theme,.fixed-off-theme {
    transition: 0.8s;
    -webkit-transition:  0.8s;
    -moz-transition: transform 0.8s;
    -o-transition: transform 0.8s;
  }
</style>
