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
    const user = window.localStorage.user
    if(user != null && user != undefined) {
      let u = JSON.parse(user);
      axios.get("https://conf.grepiu.com/oauth/check?accessToken="+u.accessToken).then(r=>{
        if(r.data.code == 200 && r.data.isValid) {
          commit("LOGIN", u);
        } else {
          commit("LOGOUT");
        }
      })

    }
  },
  login ({commit}, {id,password}) {
    axios.post("https://conf.grepiu.com/oauth/login", {id, password}).then(
      (data)=> {
        if(data.data.code == 200) {
          commit("LOGIN", data.data)
        } else {
          commit("LOGOUT")
        }
      }
    )
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
    window.localStorage.setItem("user", JSON.stringify(payload))
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ payload.accessToken
  },
  LOGOUT(state) {
    //Set disconnected
    if (this.stompClient) {
      this.stompClient.disconnect()
    }

    state.user = null;
    axios.defaults.headers.common["Authorization"] = null;
    delete window.localStorage.user
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
