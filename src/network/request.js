import axios from 'axios'

// instance本身就可以返回promise
export function request(config) {
  // promise 推荐

  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://150.122.185.210:8000',
    timeout: 5000
  })

  // 2. 拦截器
  // axios.interceptors.request.use(config =>{
  //   console.log(config);
  //   return aaa
  // },err => {
  //   // console.log(err);
  // });
  // axios.interceptors.response.use(res => {
  //   console.log(res);
  //   return res.data
  // },err => {
  //   // console.log(err);
  // });

 //  3.发送真正的网络请求
  return instance(config)

}
