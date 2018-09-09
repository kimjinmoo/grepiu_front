import axios from 'axios'

const state = {
  user : null
}

const getters = {
  getUser: (state, getters, rootState) => {
    return state.user
  }
}

const actions = {
  autoLogin ({commit}) {
    const user = localStorage.user
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
          commit("removeToken")
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
    state.user = payload
    localStorage.setItem("user", JSON.stringify(payload))
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ payload.accessToken
  },
  LOGOUT(state) {
    state.user = null;
    axios.defaults.headers.common["Authorization"] = null;
    delete localStorage.user
  }
}

export default {
  namespaced : true,
  state,
  getters,
  actions,
  mutations
}
