import axios from 'axios'

// 导出一个命名的函数，所以不是 default
// config 是需要指定的，传入的配置
export function request(config) {
  // 创建一个 axios 实例，传入一些通用的配置
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66/',
    timeout: 5000,
  });

  // 添加请求拦截器，注意是给你这个实例添加，才有效！
  instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  return instance(config)
}
