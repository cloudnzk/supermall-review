import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
  // actions 除了写异步操作外，还可以写使用多个 mutations 的复杂逻辑
  addCart(context, payload){
    // 返回一个 Promise，来传递一些回调信息，给 Toast 弹窗展示
    return new Promise((resolve) => {
      // 2.查询该商品，是否之前已加入
      const product = context.state.cartList.find(item => item.iid === payload.iid)
      if(product){
        // 提交一个 mutations
        context.commit(ADD_COUNTER, product)
        resolve('商品数量加一')
      }
      else{
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加商品到购物车成功')
      }
    })
  }
}
