import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
  // actions 除了写异步操作外，还可以写使用多个 mutations 的复杂逻辑
  addCart(context, payload){
    // 2.查询该商品，是否之前已加入
    const product = context.state.cartList.find(item => item.iid === payload.iid)
    if(product){
      // 提交一个 mutations
      context.commit(ADD_COUNTER, product)
    }
    else{
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  }
}
