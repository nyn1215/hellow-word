import Vue from 'vue'
// import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'

const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        roles: [],
        info: {}
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            Vue.ls.set(ACCESS_TOKEN, token, 30 * 24 * 60 * 60 * 1000)
        },
        SET_NAME: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_INFO: (state, info) => {
            state.info = info
            Vue.ls.set(USER_INFO, info)
        }
    },

    actions: {
        // 登录
        login({ commit }, data) {
            // Vue.ls.set(ACCESS_TOKEN, userInfo.token, 30 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', data)
                // return new Promise((resolve, reject) => {
                //   login(userInfo).then(response => {
                //     const result = response.result
                //     Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
                //     commit('SET_TOKEN', result.token)
                //     resolve()
                //   }).catch(error => {
                //     reject(error)
                //   })
                // })
        },
        GetInfo({ commit }, userInfo) {

        },
        // 获取用户信息
        setInfo({ commit }, data) {
            // Vue.ls.set(USER_INFO, userInfo)
            commit('SET_INFO', data)
                // return new Promise((resolve, reject) => {
                //   getInfo().then(response => {
                //     const result = response.result

            //     if (result.role && result.role.permissions.length > 0) {
            //       const role = result.role
            //       role.permissions = result.role.permissions
            //       role.permissions.map(per => {
            //         if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //           const action = per.actionEntitySet.map(action => { return action.action })
            //           per.actionList = action
            //         }
            //       })
            //       role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            //       commit('SET_ROLES', result.role)
            //       commit('SET_INFO', result)
            //     } else {
            //       reject(new Error('getInfo: roles must be a non-null array !'))
            //     }

            //     commit('SET_NAME', { name: result.name, welcome: welcome() })
            //     commit('SET_AVATAR', result.avatar)

            //     resolve(response)
            //   }).catch(error => {
            //     reject(error)
            //   })
            // })
        },

        // 登出
        logout({ commit, state }) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', null);
                commit('SET_INFO', null);
                Vue.ls.remove(ACCESS_TOKEN);
                Vue.ls.remove(USER_INFO);
                // logout(state.token).then(() => {
                //   resolve()
                // }).catch(() => {
                //   resolve()
                // }).finally(() => {
                //   commit('SET_TOKEN', '')
                //   commit('SET_ROLES', [])
                //   Vue.ls.remove(ACCESS_TOKEN)
                // })
            })
        }

    }
}

export default user