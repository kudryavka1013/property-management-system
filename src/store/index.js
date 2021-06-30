import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        account: '',
        username: '',
        isAuthenticated: false,
        isActivated: false,
        accountType: 1
    },
    mutations: {
        upgradeAccount(state, newAccount) {
            state.account = newAccount
        },
        upgradeUsername(state, newUsername) {
            state.username = newUsername
        },
        upgradeAccountType(state, newAccountType){
            state.accountType = newAccountType
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
            state.accountType = 0
        }
    },

})


export default store