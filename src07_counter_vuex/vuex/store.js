/* vue最核心的管理对象模块 */
import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

/* 相当于data的对象,包含n个可变的属性 */
const state = {
  count:0, // 初始化数据
}

/*  mutations是一个包含n个函数(方法)对象,用于直接更新状态数据
    不要包含异步和逻辑处理代码
*/

const mutations = {
// 要么加一要么减一
  INCREMENT(state){
    // 增加的方法
    state.count++
  },
  DECREMENT(state){ 
    // 减少的方法
    state.count--
  }
}

/* action是一个包含n个用于简介更新状态数据方法的对象 
   action方法中 可以包含异步和逻辑处理代码
*/
const actions = {
  /* increment(context){
    // commit触发mutations调用
    context.commit('increment')
  } */
  // 简写
  increment({commit}){
    commit('INCREMENT')
  },

  decrement({commit}){
    commit('DECREMENT')
  }, 

  incrementIfOdd({commit,state}){
    // 不是直接增加,而是提交mutations调用
    // 取状态数据
    // 取多个数据声明接收一个对象,通过一个参数接受多个数据
    if(state.count%2 === 1){
      commit('INCREMENT')
    }   
  },

  incrementAsync({commit}){
    setTimeout(() => {
      commit('INCREMENT') 
    }, 1000);
  },
}

/* 是一个包含n个基于state数据的getter计算属性的方法的对象 */
// 那个计算属性需要写在getter里,看计算属性依不依赖于state里的数据

const getters = {
  evenOrOdd(state){
    return state.count % 2 == 1 ? '奇数' : '偶数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})