import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '@/router'

import { Message, MessageBox } from 'element-ui'

import utils from '@/utils'

class Axios {
  baseURL: string
  constructor(url: string){
    this.baseURL = url
  }

  getDefaultConfig(){
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 50000
    }
    return config
  }

  setInterceptors(axiosInstance: AxiosInstance){
    axiosInstance.interceptors.request.use((config: AxiosRequestConfig)=>{
      const token = utils.getToken()
      if(token) config.headers.Authorization = `Bearer ${token}`
      return config
    }, (err)=>{
      return Promise.reject(err)
    })

    axiosInstance.interceptors.response.use((res: AxiosResponse)=>{
      if(res.status === 200){
        if(res.data.code === 101) {
          MessageBox.confirm('管理员未登录，请先登录', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
            router.push('/login')
          })
          return Promise.reject(res)
        } else if(res.data.code === 102){
          MessageBox.confirm('您的登陆已经过期，请重新登陆', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
            router.push('/login')
          })
          return Promise.reject(res)
        } else {
          return Promise.resolve(res.data)
        }

      } else {
        return Promise.reject(res)
      }
    }, (err)=>{
      return Promise.reject(err)
    })
  }

  request(options:AxiosRequestConfig){
    const instance = axios.create()
    const newOptions = Object.assign({}, this.getDefaultConfig(), options)
    this.setInterceptors(instance)
    return instance(newOptions)
  }

}

export default Axios
