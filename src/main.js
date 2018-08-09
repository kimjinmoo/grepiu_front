import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import {config} from './config/firebaseConfig'
import firebase from 'firebase/app'
import "firebase/auth"
import VueGeolocation from 'vue-browser-geolocation'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCarousel from 'vue-carousel';
import store from './store'
import VueDisqus from 'vue-disqus'

Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(VueDisqus)
Vue.use(BootstrapVue)
Vue.use(VueCarousel)
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCdlJJ5RuA6jrq-VzexA-8ryqOJVqTJJ-Y',
    libraries: 'places,drawing,visualization'
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user)=>{
      if(user) {
        this.$store.dispatch("autoSignIn", user)
      }
    })
  }
})
