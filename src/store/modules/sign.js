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
    const { created_by, token, sign_time } = signFrom
    return new Promise((resolve, reject) => {
      sign({ created_by: created_by.trim(), token: token, sign_time: sign_time }).then(response => {
        console.log(response)
        return response
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

