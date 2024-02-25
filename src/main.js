// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'es6-promise/auto'
import Vuex from 'vuex'
import store from './store/store.js'

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  computed: Vuex.mapState(['keywordTable', 'imagesTable', 'loading']),
  router,
  store,
  created() {
    this.$store.dispatch('loadData') // dispatch loading
  },
  components: { App },
  template: '<App/>'
})
