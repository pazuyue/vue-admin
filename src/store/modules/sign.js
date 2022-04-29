import { sign } from '@/api/sign'

const state = {
  logs: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  sign({ commit }, signFrom) {
    console.log(signFrom)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

