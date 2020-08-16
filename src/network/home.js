
import {request1} from './request1'

//获取轮播图数据
export function getHomeSwiper(){
  return request1({
    url: 'home/swiper',
    method: 'get'
  })
}
//获取recommends数据

export function getHomeRecommend(){
  return request1({
    url: '/home/recmd',
    method: 'get'
  })
}

//获取pop数据
export function getHomePop(page) {
  return request1({
    url: '/home/pop/' + page,
    method: 'get'
  })
}

//获取sell数据
export function getHomeSell(page) {
  return request1({
    url: '/home/sell/' + page,
    method: 'get'
  })
}

//获取pop数据
export function getHomeNew(page) {
  return request1({
    url: '/home/new/' + page,
    method: 'get'
  })
}

