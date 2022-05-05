import { login } from '@/api/user'
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
    console.log('sign-modules')
    new Promise(function(resolve, reject) {
      var signtime = Math.round(new Date(signFrom.sign_time).getTime() / 1000)
      sign({ created_by: signFrom.created_by, user_id: signFrom.user_id, sign_time: signtime }).then(response => {
        const { data } = response
        console.log(data)
        resolve()
      }).catch(error => {
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

