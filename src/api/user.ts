import { axios } from "@/libs/request";

export const login = (data:{account: string; password: string})=>(
  axios.request({
    url: '/login/login',
    method: 'post',
    params: data
  })
)
