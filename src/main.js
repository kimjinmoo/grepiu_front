import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueGeolocation from 'vue-browser-geolocation'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCarousel from 'vue-carousel';
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.silent = false
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'));
Vue.use(BootstrapVue)
Vue.use(VueCarousel)
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'geometry'
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
