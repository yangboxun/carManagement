import { axios } from "@/libs/request";

export interface Page {
  limit: number,
  page: number
}

export const getGoodsList = (params: Page & { goods_name: string })=>(
  axios.request({
    url: '/goods/list',
    method: 'get',
    params
  })
)

export const getGoodOptions = ()=>(
  axios.request({
    url: '/goods/getGoods',
    method: 'get',
  })
)

export const addGoods = (params: { goods_name: string;})=>(
  axios.request({
    url: '/goods/add',
    method: 'post',
    params
  })
)

export const editeGoods = (params: { id: string|number; goods_name: string})=>(
  axios.request({
    url: '/goods/edit',
    method: 'put',
    params
  })
)

export const deleteGoods = (params: { id: string })=>(
  axios.request({
    url: '/goods/del',
    method: 'post',
    params
  })
)
