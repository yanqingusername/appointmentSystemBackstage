import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken,setName,setPhone,getName,setroleId,getroleId } from '@/utils/auth'
import { setRole } from '../../utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          console.log('---->:',data)
          setRole(data.roleId)  //将roleId存入cookie中
          setToken(data.token)
          setName(data.realName)
          //从cookie中获取token值
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.realName)   
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(getName())
        getInfo(getName()).then(response => {
          const data = response.data
          if (data.roleId && data.roleId.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roleId)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.realName)
          commit('SET_AVATAR', data.avatar)
          
          setPhone(data.phone)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut() {
      return new Promise((resolve, reject) => {
          removeToken()
          resolve()
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
