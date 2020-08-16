import axios from 'axios'
//将购物车数据添加到数据库
export function addCartToDB(cartInfo){

  const cart = {iid:cartInfo.iid,image: cartInfo.image,title:cartInfo.title,descr: cartInfo.descr,price: cartInfo.price,counts: cartInfo.counts}
  axios.defaults.withCredentials = false
  axios.post("http://localhost:8085/mall/cart/add",cart)
  .then( res => {
    console.log(res);

  }).catch( err => {
    //console.log(err);

  });

}

//修改商品的个数
export function putCountToDB(data){
  axios.put("http://localhost:8085/mall/cart/count",data)
  .then( res => {
    console.log(res);

  }).catch( err => {
    //console.log(err);

  });

}

//获取购物车数据
export async function  getCartByDB(){
  console.log('进入cart');
  let shop = [];
  await axios.get("http://localhost:8085/mall/cart/get").then( res => {
    shop = res;
    console.log(shop);
  })

  return shop
}
//删除购物车数据
export function deleteCartByDB(data){
    axios.defaults.withCredentials = false
    axios({
    url: 'http://localhost:8085/mall/cart/delete/' + data,
    method: 'delete'
  }).then( res => {
    console.log(res);
  }).catch( err => {
    console.log(err);
    
  })
}

