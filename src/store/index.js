import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        account: '',
        username: '',
        isAuthenticated: false,
        isActivated: false
    },
    mutations: {
        upgradeAccount(state, newAccount) {
            state.account = newAccount
        },
        upgradeUsername(state, newUsername) {
            state.username = newUsername
        },
        activate(state) {
            state.isActivated = true
        },
        login(state) {
            state.isAuthenticated = true
        },
        logout(state) {
            state.isAuthenticated = false
            state.isActivated = false
            state.account = ''
            state.username = ''
        }
    },

})


export default store