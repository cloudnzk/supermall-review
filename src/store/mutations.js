import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
  // mutations 唯一的目的就是修改 state 中的状态
  // mutations 中的每个方法尽可能完成单一的事件

  // 操作1：添加商品到购物车
  [ADD_TO_CART](state, payload){
    // 添加一个 checked 属性，默认选中
    payload.checked = true
    state.cartList.push(payload)
  },

  // 操作2：购物车商品数量 +1
  [ADD_COUNTER](state,payload){
    payload.count += 1
  }
}
