import axios from 'axios'

export function request(config) {
  //创建axios实例

  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  //2.axios拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    //1.一些信息不符合服务器的要求  对信息做一些转换
    //2.每次发送请求时，界面显示一个请求的动画
    //3.某些请求（登录，token） 必须携带一些特殊的信息
    return config 
  },err => {
    // console.log(err);
  })

  //2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },err => {
    console.log(err);
  })
  //3.发送网络请求
  return instance(config)


}
// export function request(config) {
//   //创建axios实例
// return new Promise((resolve,reject) => {
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   //发送网络请求
//   instance(config)
//   .then(res => {
//     resolve(res)
//   })
//   .catch(err => {
//     reject(err)
//   })
// })
// }
// export function request(config) {
//   //创建axios实例
// const instance = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// })
// //发送网络请求
// instance(config.baseConfig)
// .then(res => {
//   config.success(res)
// })
// .catch(err => {
//   config.failure(err)
// })
// }
// export function request(config, success, failure) {
//   //创建axios实例
// const instance = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// })
// //发送网络请求
// instance(config)
// .then(res => {
//   success(res)
// })
// .catch(err => {
//   failure(err)
// })
// }
