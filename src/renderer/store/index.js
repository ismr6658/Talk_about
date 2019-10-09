import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState} from 'vuex-electron'
// import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production',
  state:{
    token:'',    //登录token
    peopleInfo:{}, //
    talk_list:[], // 当前对话列表
    current_talker:{}, //当前对话
    user:'', //登录用户
    msgs:[],  //信息列表,
    num:10,
    emoji:[],//表情
    map:{}
  },
  mutations:{
    setToken(state,o){
      state.token=o
    },
    setPeopleInfo(state,o){
      state.peopleInfo=o
    },
    add_talk_list(state,o){
      state.talk_list=o
    },
    setCurrent_talker(state,o){
      state.current_talker=o
    },
    setUser(state,o){
      state.user=o
    },
    addMsg(state,o){
      state.msgs.push(o)
    },
    setMsg(state,o){
      state.msgs=o
    },
    set_nums(state,o){
      state.num=o
    },
    clear(state){
      state.token='',    //登录token
      state.peopleInfo={}, //
      state.talk_list=[], // 当前对话列表
      state.current_talker={}, //当前对话
      state.user='', //登录用户
      state.msgs=[],  //信息列表,
      state.num=10
    },
    set_emoji(state,o){
      state.emoji=o
    },
    setMap(state,o){
      state.map=o
    }
  },
  actions:{
    setToken({commit},o){
      commit('setToken',o)
    },
    setPeopleInfo({commit},o){
      commit('setPeopleInfo',o)
    },
    add_talk_list({commit},o){
      commit('add_talk_list',o)
    },
    setCurrent_talker({commit},o){
      commit('setCurrent_talker',o)
    },
    setUser({commit},o){
      commit('setUser',o)
    },
    setToken({commit},o){
      commit('setToken',o)
    },
    addMsg({commit},o){
      commit('addMsg',o)
    },
    setMsg({commit},o){
      commit('setMsg',o)
    },
    set_num(context,o){
        context.commit('set_nums',o)
    },
    clear({commoit}){
      commit('clear')
    },
    set_emoji({commit},o){
      commit('set_emoji',o)
    },
    setMap({commit},o){
      commit('setMap',o)
    }

  }
})
