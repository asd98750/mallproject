export function formatDate(date, fmt) {
  //1.获取年份
  //y+ -> y yy yyy yyyy  
  //?：可有可无 最多一个
  //+：一个或者多个
  //*：可有可无，数量不限
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.获取
  //M+ ->
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

//04:04:04
//不足两位用0补足两位
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};


//节流防抖
export function debounce(func, delay) {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);

  }
}
