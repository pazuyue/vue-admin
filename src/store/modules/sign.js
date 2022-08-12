import { sign, signList } from '@/api/sign'

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
  },
  signList({ commit }, data) {
    var list = new Promise(function(resolve, reject) {
      signList(data).then(response => {
        const { data } = response
        data.list.forEach((v, i) => {
          if (v.state === 1) {
            v.state = '有效'
          } else {
            v.state = '已使用'
          }
          v.sign_time = v.sign_time * 1000
          v.username = v.systemUser.username
        })
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
    return list
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

