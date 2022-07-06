/**
 * 防抖函数
 * 原理：等待一段时间，如果在这段时间内又调用了这个函数，那么就清空定时器，先不执行
 */

/**
 * 防抖函数
 * @param {需要执行的函数} func
 * @param {等待的时间} delay
 */
export function debounce(func, delay){

  // 这里使用了闭包，所以 timer 不会轻易被销毁
  let timer = null

  // 生成一个新的函数并返回
  return function (...args){
    // 清空定时器
    if(timer){
      clearTimeout(timer)
    }
    // 重新启动定时器
    timer = setTimeout(()=>{
      func.call(this, ...args)
    }, delay)
  }
}
