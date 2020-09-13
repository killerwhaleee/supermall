import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)
//2.创建store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations: {
    // mutations唯一的目的就是修改state中状态
    // mutations中的每个方法尽可能完成的事件比较单一一点  如果异步操作等复杂的可以放到action 然后通过action到mutations
    addCounter(state,payLoad){
      payLoad.count++
    },
    addToCart(state,payLoad){
      payLoad.checked = false
      state.cartList.push(payLoad)
    }
  },
  actions:{
    addCart(context, payLoad) {
      // state.cartList.push(payLoad)
      //  payLoad新添加的商品
      // 其中一种方法
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payLoad.iid) {
      //     oldProduct = item
      //   }
      // }
      //  方法2
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
      //  2.判断oldproduct
      if(oldProduct){
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)
      }else{
        payLoad.count = 1
        // context.state.cartList.push(payLoad)
        context.commit('addToCart',payLoad)
      }

    }
  }

})

//  3.挂载到vue实例
export default store
