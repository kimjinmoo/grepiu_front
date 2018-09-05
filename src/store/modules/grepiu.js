import axios from 'axios'

const state = {
  accessToken : null
}

const getters = {
  getToken: (state, getters, rootState) => {
    return state.accessToken
  }
}

const actions = {
  autoLogin ({commit}) {
    const accessToken = localStorage.accessToken
    if(accessToken != null && accessToken != undefined) {
      commit("setToken", accessToken);
    }
  },
  login ({commit}, {id,password}) {
    axios.post("https://conf.grepiu.com/oauth/login", {id, password}).then(
      (data)=> {
        if(data.data.code != 400) {
          commit("setToken", data.data.access_token)
        } else {
          commit("removeToken")
        }
      }
    )
  },
  logout({commit}){
    axios.post("https://conf.grepiu.com/oauth/logout").then(
      () => {
        commit("removeToken")
      }
    )
  }
}

const mutations = {
  setToken(state, accessToken) {
    state.accessToken = accessToken;

    localStorage.setItem("accessToken", accessToken)
    axios.defaults.headers.common["Authorization"] = 'Bearer '+ accessToken
  },
  removeToken(state) {
    state.accessToken = null;
    axios.defaults.headers.common["Authorization"] = null;
    delete localStorage.accessToken
  }
}

export default {
  namespaced : true,
  state,
  getters,
  actions,
  mutations
}
