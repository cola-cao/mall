import {request} from './request'

export function detailData(iid){

  return request({
    url: '/api/n3/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo,columns,service){
    this.title = itemInfo.title;
    this.realPrice = itemInfo.lowPrice;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.desc = itemInfo.desc;
    this.services = service;
    this.discountBgColor = itemInfo.discountBgColor
    console.log(this.discountBgColor);
    
  }
}

export function getRecommend(){
  
    return request({
      url:'/api/n3/recommend',
    })

}