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

Vue.config.productionTip = false
Vue.use(require('vue-moment'));
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
  router,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp(config)
    router.beforeEach((to,from,next) =>{
      // 권한 설정
      firebase.auth().onAuthStateChanged(()=>{
        const currentUser = firebase.auth().currentUser;
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        if (requiresAuth && !currentUser) {
          next('/signIn');
        } else if (requiresAuth && currentUser) {
          next();
        } else {
          next();
        }
      })
    });
  }
})
