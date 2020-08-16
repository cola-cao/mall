import axios from 'axios'

// 防抖函数
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}

// 时间戳格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
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
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


   //添加cookie
  export function setCookie (name, value) {
    console.log(name);
    console.log(value);
    
    
    if (value) {
    var days = 1; //定义一天
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    // 写入Cookie, toGMTString将时间转换成字符串
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString;
      return true
    }
  };
 //获取cookie
  export function getCookie (name) {
  var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //匹配字段
  if (arr = document.cookie.match(reg)) {
  return unescape(arr[2]);
  } else {
  return null;
  }
  };


