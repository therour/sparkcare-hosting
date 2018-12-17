// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import Vuefire from 'vuefire'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.config.productionTip = false

Vue.use(Vuefire)
Vue.use(Vuetify, {
  theme: {
    info: colors.lightBlue.lighten3
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
