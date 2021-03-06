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
//import GmapCluster from 'vue2-google-maps/dist/components/cluster'
import vuescroll from 'vue-scroll'
import VueClipboard from 'vue-clipboard2'
import AOS from "aos";
import "aos/dist/aos.css";
import 'vue-material-design-icons/styles.css';
import AppleIos from 'vue-material-design-icons/Apple';
import SearchWeb from 'vue-material-design-icons/SearchWeb';
import Android from 'vue-material-design-icons/Android';
import VueMeta from 'vue-meta'

Vue.config.silent = false
Vue.config.productionTip = false
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
Vue.use(VueAxios, axios)
Vue.use(VueGeolocation)
Vue.use(require('vue-moment'))
Vue.use(BootstrapVue)
Vue.use(VueCarousel)
Vue.use(VueClipboard)
// Vue.component('GmapCluster', GmapCluster)
Vue.component('apple-market', AppleIos);
Vue.component('search-web', SearchWeb);
Vue.component('android-market', Android);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_API_KEY,
    libraries: 'geometry'
  }
})
Vue.use(vuescroll)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  created() {
    AOS.init({
      easing: 'ease-out-back',
      //once: true,
      disable: "phone"
    });
  },
  store,
  router,
  components: { App },
  template: '<App/>'
})
