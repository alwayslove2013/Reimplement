import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  coreType: String,
  coreText: String,
  word2titles: [],
  word2tags: [],
  word2authors: [],
  core2items: []
}

const getters = {}

const types = {
  UPDATE_WORD2TITLES: 'UPDATE_WORD2TITLES',
  UPDATE_WORD2TAGS: 'UPDATE_WORD2TAGS',
  UPDATE_WORD2AUTHORS: 'UPDATE_WORD2AUTHORS',
  UPDATE_CORE_TYPE: 'UPDATE_CORE_TYPE',
  UPDATE_CORE_TEXT: 'UPDATE_CORE_TEXT',
  UPDATE_CORE2ITEMS: 'UPDATE_CORE2ITEMS'
}

const mutations = {
  [types.UPDATE_WORD2TITLES] (state, payload) {
    state.word2titles = payload
  },
  [types.UPDATE_WORD2TAGS] (state, payload) {
    state.word2tags = payload
  },
  [types.UPDATE_WORD2AUTHORS] (state, payload) {
    state.word2authors = payload
  },
  [types.UPDATE_CORE_TYPE] (state, payload) {
    state.coreType = payload
  },
  [types.UPDATE_CORE_TEXT] (state, payload) {
    state.coreText = payload
  },
  [types.UPDATE_CORE2ITEMS] (state, payload) {
    state.core2items = payload
  }
}

const actions = {
  updateCore ({commit}, payload) {
    console.log('更新core', payload)
    commit(types.UPDATE_CORE_TYPE, payload.type)
    commit(types.UPDATE_CORE_TEXT, payload.text)
    axios({
      methods: 'get',
      url: '/api/core_' + payload.type,
      params: {
        word: payload.text
      },
      timeout: 10000
    })
      .then(function (response) {
        console.log('test: 接受后端的数据', response.data)
        let items = response.data.data
        console.log('coreData', items)
        commit(types.UPDATE_CORE2ITEMS, items)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  updateWord2Titles ({commit}, payload) {
    // console.log('test: Word2Titles', payload)
    if (payload === '') {
      commit(types.UPDATE_WORD2TITLES, [])
    } else {
      axios({
        methods: 'get',
        url: '/api/search_titles',
        // params指定传过去的参数，server使用query接收
        params: {
          word: payload
        },
        timeout: 10000
      })
        .then(function (response) {
          // console.log('test: 接受后端的数据', response.data.data)
          let foo = response.data.data
          commit(types.UPDATE_WORD2TITLES, foo)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  updateWord2Authors ({commit}, payload) {
    // console.log('test: Word2Authors', payload)
    if (payload === '') {
      commit(types.UPDATE_WORD2AUTHORS, [])
    } else {
      axios({
        methods: 'get',
        url: '/api/search_authors',
        // params指定传过去的参数，server使用query接收
        params: {
          word: payload
        },
        timeout: 10000
      })
        .then(function (response) {
          // console.log('test: 接受后端的数据', response.data.data)
          let foo = response.data.data
          console.log('test', foo)
          commit(types.UPDATE_WORD2AUTHORS, foo)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  updateWord2Tags ({commit}, payload) {
    // console.log('test: Word2Tags', payload)
    if (payload === '') {
      commit(types.UPDATE_WORD2TAGS, [])
    } else {
      axios({
        methods: 'get',
        url: '/api/search_tags',
        // params指定传过去的参数，server使用query接收
        params: {
          word: payload
        },
        timeout: 10000
      })
        .then(function (response) {
          // console.log('test: 接受后端的数据', response.data.data)
          let foo = response.data.data
          commit(types.UPDATE_WORD2TAGS, foo)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
