import { axios } from "@/libs/request";


export interface Page {
  limit: number,
  page: number
}

export const getOrderList = (params: Page & {
  number_plate?: string|number;
  motorcade?: string|number;
  site_outset?: string|number;
  site_end?: string|number;
  goods_name?: string|number;
  bill_time_start?:string|number;
  bill_time_end?: string|number })=>(
  axios.request({
    url: '/bill/list',
    method: 'get',
    params
  })
)

export const addOrder= (params: {
  number_plate?: string|number;unit_price?: string|number; capacity: string|number;site_outset?: string|number;site_end?: string|number;goods_name?: string|number;bill_time?:string|number; })=>(
  axios.request({
    url: '/bill/add',
    method: 'post',
    params
  })
)

export const editeOrder = (params: {
  id: string|number;
  number_plate?: string|number;unit_price?: string|number; capacity: string|number;site_outset?: string|number;site_end?: string|number;goods_name?: string|number;bill_time?:string|number; })=>(
  axios.request({
    url: '/bill/edit',
    method: 'put',
    params
  })
)

export const deleteOrder = (params: { id: string })=>(
  axios.request({
    url: '/bill/del',
    method: 'post',
    params
  })
)

export const getOrderCount = (params:{
  number_plate?: string|number;
  motorcade?: string|number;
  site_outset?: string|number;
  site_end?: string|number;
  goods_name?: string|number;
  bill_time_start?:string|number;
  bill_time_end?: string|number })=>(
  axios.request({
    url: 'bill/getCountInfo',
    method: 'get',
    params
  })
)

export const postExporTable = (params:{
  number_plate?: string|number;
  motorcade?: string|number;
  site_outset?: string|number;
  site_end?: string|number;
  goods_name?: string|number;
  bill_time_start?:string|number;
  bill_time_end?: string|number })=>(
  axios.request({
    url: '/bill/export',
    method: 'get',
    responseType: 'blob',
    params
  })
)
