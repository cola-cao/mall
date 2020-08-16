//import axios from 'axios'
export default  {
  addCart(context,payload){

    //payload新添加的商品
    let oldProduct = null;
    for(let item of context.state.cartList){
      if(item.iid === payload.iid){
        oldProduct = item;
      }
    }
    
    //2.判断oldProduct
    if(oldProduct){
      //oldProduct.count += 1;
      context.commit('addCounter',oldProduct)
    }else{
      payload.count =1;
      context.commit('addToCart',payload)
    }
  },
  //从数据库调取数据添加到mutation
  addDataToMutation(context,payload){
    
    console.log("我已进入action");
    console.log('action' + payload);
    
    
    context.commit('addDataToVuex',payload)
    
  },
  

  //删除cart
  deleteDataToMutation(context,payload){
    console.log("进入action");
    console.log(payload);
    
    context.commit('deleteCartByDB',payload)
  }

}


