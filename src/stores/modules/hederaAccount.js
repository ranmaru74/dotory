import Vue from 'vue';

const state = {
    account: {},
    accounts: {},
    tokens: {},
    allTokens: {}
}

const getters = {
    numberOfAccounts(state) {
        return Object.keys(state.accounts).length || 0;
    },
    getAccount(state) {
        return state.account;
    },
    getAccounts(state) {
        return state.accounts;
    },
    getCurrentAccount(state) {
        return state.account
    }
}

const mutations = {
    setCurrentAccount(state, account) {
        state.account = account
    },
    setAccount(state, account) {
        // state.accounts[account.accountId] = account
        Vue.set(state.accounts, account.accountId, account);
    },
    setToken(state, token) {
        Vue.set(state.tokens, token.tokenId, token);
    }
}

const actions = {
    setAccounts({ commit, state }, accounts) {
        console.log('action setAccounts');
        for(let account of accounts) {
            console.log(account)
            commit('setAccount', account)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}