import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import InstantSearch from 'vue-instantsearch'
import VueResource from 'vue-resource'
import VScrollToTop from 'v-scroll-to-top'

import router from './router'
import { store } from './store'
import AlertCmp from './components/shared/alert.vue'
import EditProductDialog from './components/manage/editProductDialog.vue'

import 'vuetify/dist/vuetify.min.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(InstantSearch);
Vue.use(VueResource);
Vue.use(VScrollToTop);

Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-product-dialog', EditProductDialog)

new Vue({
  render: h => h(App),
  created () {
    firebase.initializeApp ({
      apiKey: 'AIzaSyBZ25DIfy_g96Pnkk84F2h-V5QjGxKFsfk',
      authDomain: 'shopon-e1503.firebaseapp.com',
      databaseURL: 'https://shopon-e1503.firebaseio.com',
      projectId: 'shopon-e1503',
      storageBucket: 'gs://shopon-e1503.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadProduct')
  },
  router,
  store
}).$mount('#app')
