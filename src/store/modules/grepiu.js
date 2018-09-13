import axios from 'axios'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

const state = {
  user : null,
  message : null
}

const getters = {
  getUser: (state, getters, rootState) => {
    return state.user
  },
  getMessage: (state, getters, rootState) => {
    return state.message
  }
}

const actions = {
  autoLogin ({commit}) {
    const user = localStorage.getItem("user")
    if(user != null && user != undefined) {
      let u = JSON.parse(user);
      axios.get("https://conf.grepiu.com/oauth/check?accessToken="+u.accessToken).then(res=>{
        if(res.data.code == 200 && res.data.isValid) {
          commit("LOGIN", u);
        } else {
          commit("LOGOUT");
        }
      })

    }
  },
  login ({commit}, {id,password}) {
    return new Promise(function (resolve, reject) {
      axios.post("https://conf.grepiu.com/oauth/login", {id, password}).then(
        (res)=> {
          if(res.data.code == 200) {
            commit("LOGIN", res.data)
          } else {
            commit("LOGOUT", res.data)
          }
          resolve(res);
        })
    });
  },
  logout({commit}){
    axios.post("https://conf.grepiu.com/oauth/logout").then(
      () => {
        commit("LOGOUT")
      }
    )
  }
}

const mutations = {
  LOGIN(state, payload) {
    //Web Socket Set
    this.socket = new SockJS('https://conf.grepiu.com/ws');
    this.stompClient = Stomp.over(this.socket, {
      debug : false
    });
    this.stompClient.connect({}, ()=>{
      this.connected = true;
      this.stompClient.subscribe("/topic/messages", (tick) => {
        state.message = JSON.parse(tick.body).message;
      })
    },(error) => {
      //console.log(error);
    })

    state.user = payload
    localStorage.setItem("user", JSON.stringify(payload))
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ payload.accessToken
  },
  LOGOUT(state) {
    //Set disconnected
    if (this.stompClient) {
      this.stompClient.disconnect()
    }

    state.user = null;
    axios.defaults.headers.common["Authorization"] = null;
    delete localStorage.user
  },
  MESSAGE(state, message) {
    state.message = message;
  }
}

export default {
  namespaced : true,
  state,
  getters,
  actions,
  mutations
}
