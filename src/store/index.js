import Vue from 'vue'
import Vuex from 'vuex'
import { FETCH_MEMBERS, SET_MEMBERS, SET_TOTAL_MEMBERS } from '@/store/cosnts/consts'
import axios from 'axios'
// import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: [],
    totalMembers: 0
  },
  mutations: {
    [SET_MEMBERS] (state, payload) {
      state.members = payload
    },
    [SET_TOTAL_MEMBERS] (state, payload) {
      state.totalMembers = payload
    }
  },
  actions: {
    async [FETCH_MEMBERS] ({ commit }) {
      const { data } = await axios.get('https://run.mocky.io/v3/34234632-e36c-450d-a0a5-63249d1fa3ad')

      commit(SET_TOTAL_MEMBERS, data.count)
      commit(SET_MEMBERS, data.members)
    }
  },
  getters: {
    membersList: state => state.members
  },
  modules: {
  }
})
