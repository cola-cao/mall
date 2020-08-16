import {putCountToDB,addCartToDB} from 'network/cart'

export default {
  addCounter(state,payload){
    payload.counts++;
    const data = {iid: payload.iid, counts: payload.counts}
    putCountToDB(data);
  },
  addToCart(state,payload){
    if(payload){
      addCartToDB(payload)
    }
    payload.checked = true
    state.cartList.push(payload)
  },

  //从数据库调取数据添加到vuex
  addDataToVuex(state,payload){
    console.log("我已进入mutations");
    console.log('payload'+payload);
    //console.log(payload.length);
    
    
    for(let item of payload){
     // console.log(item);
      state.cartList.push(item)
    }
    //console.log('vuex'+stata.cartList);
  },

  //修改counts
  changeCount(state,payload){
    let datas = {iid: payload.iid, counts: payload.counts}
    putCountToDB(datas);
  },

  //删除Cart数据
  deleteCartByDB(state,payload){
    console.log("进入Mul");
    console.log("deleteCartByDB");
    console.log(payload);
    for(let i=0;i < state.cartList.length;i++){
      console.log(state.cartList[i].iid);
      if(state.cartList[i].iid===payload){
        state.cartList.splice(i,1)
      }
    }
  }
} 


