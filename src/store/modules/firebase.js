import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import firebase from "firebase/app";
import "firebase/auth"

const grep = new Vuex.Store(
  {
    namespaced: true,
    state: {
      token: null
    },
    mutations: {
      setToken(state, {payload}) {
        state.token = payload;
      }
    },
    actions: {
      login({commit}, {id, password}) {
        this.$http.post("https://conf.grepiu.com/oauth/login").then(
          ({data})=> commit("setToken", data)
        )
      },
      logout({commit}) {
        this.$http.post("https://conf.grepiu.com/oauth/logout").then(
          () => commit("setToken", null)
        )
      }
    },
    getters: {
    }
  })

const store = new Vuex.Store(
  {
    modules: {
      grep : grep
    },
    state: {
      user: null
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload
      }
    },
    actions: {
      signUserUp({commit}, payload) {
        firebase.auth().createUserWithEmailAndPassword(payload.email,
          payload.password)
        .then(
          u => {
            commit('setUser', {
              id: u.user.uid,
              name: u.user.displayName,
              email: u.user.email,
              photoUrl: u.user.photoURL
            })
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
      },
      signUserIn({commit}, payload) {
        firebase.auth().signInWithEmailAndPassword(payload.email,
          payload.password)
        .then(
          u => {
            commit('setUser', {
              id: u.user.uid,
              name: u.user.displayName,
              email: u.user.email,
              photoUrl: u.user.photoURL
            })
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
      },
      signUserInGoogle({commit}) {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        firebase.auth().signInWithPopup(provider)
        .then(u => {
            commit('setUser', {
              id: u.user.uid,
              name: u.user.displayName,
              email: u.user.email,
              photoUrl: u.user.photoURL
            })
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
      },
      signUserInFacebook({commit}) {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
        .then(
          u => {
            commit('setUser', {
              id: u.user.uid,
              name: u.user.displayName,
              email: u.user.email,
              photoUrl: u.user.photoURL
            })
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
      },
      signUserInGithub({commit}) {
        firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then(
          u => {
            commit('setUser', {
              id: u.user.uid,
              name: u.user.displayName,
              email: u.user.email,
              photoUrl: u.user.photoURL
            })
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
      },
      autoSignIn({commit}, payload) {
        commit('setUser', {
          id: payload.uid,
          name: payload.displayName,
          email: payload.email,
          photoUrl: payload.photoURL
        })
      },
      resetPasswordWithEmail({commit}, payload) {
        const {email} = payload
        firebase.auth().sendPasswordResetEmail(email)
        .then(
          () => {
            console.log('Email Sent')
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
      },
      logout({commit}) {
        firebase.auth().signOut()
        commit('setUser', null)
      }
    },
    getters: {
      user(state) {
        return state.user
      }
    }
  })

export default store
