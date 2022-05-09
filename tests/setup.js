import Vue from 'vue'
// import './plugins/bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Vuex from 'vuex'
import _ from 'lodash'

// eslint-disable-next-line no-undef
_.debounce = jest.fn((fn) => fn)

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
