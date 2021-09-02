import Axios from './axios'

const baseURL = process.env.NODE_ENV === 'protection'?'http://47.114.166.149':"/api"

const axios = new Axios(baseURL)

export {
  axios
}


