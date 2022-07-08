/**
 * 防抖函数
 * 原理：等待一段时间，如果在这段时间内又调用了这个函数，那么就重新计时
 */

/**
 * 防抖函数
 * @param {需要执行的函数} func
 * @param {等待的时间} delay
 */
export function debounce(func, delay) {

  // 这里使用了闭包，所以 timer 不会轻易被销毁
  let timer = null

  // 生成一个新的函数并返回
  return function (...args) {
    // 清空定时器
    if (timer) {
      clearTimeout(timer)
    }
    // 重新启动定时器
    timer = setTimeout(() => {
      func.call(this, ...args)
    }, delay)
  }
}

/**
 *
 * @param {需要执行的函数} func
 * @param {时间间隔} delay
 */
export function throttle(func, delay) {
  let timer = null
  // 在 delay 时间内，最多执行一次 func
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.call(this, ...args)
        // 完成一次计时，清空，待下一次触发
        timer = null
      }, delay)
    }
  }
}

// 正则表达式：字符串匹配的利器
// 常见正则表达式规则：
  // （1）y+：匹配 1 个或多个 y
  // （2）y*：0个或多个
  // （2）y?：0个或1个
export function formatDate(date, fmt) {
  // 1.获取年份
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 即匹配到的结果
    // 截取后面的 {RegExp.$1.length} 位。例如 yy，就截取 2 位
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取月、日、时、分、秒
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 给 0 - 9 前面加上 0，例如 6:6 -> 06:06
function padLeftZero(str) {
  // 巧妙的做法：前面加上 2 个 '0'，再进行截取
  return ('00' + str).substr(str.length);
}
