import {request} from './request'

export function getHomeMultidata(){
  // 访问轮播图数据、推荐图文数据
  return request({
    url: '/home/multidata'
  })
}


export function getHomeGoods(type, page){
  return request({
    url: '/home/data',
    // GET参数，从外部传入的
    params: {
      type,
      page
    }
  })
}
