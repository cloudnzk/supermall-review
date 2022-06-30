import {request} from './request'

export function getHomeMultidata(){
  // 传入访问首页数据的接口
  return request({
    url: '/home/multidata'
  })
}
