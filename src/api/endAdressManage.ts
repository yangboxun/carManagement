import { axios } from "@/libs/request";

export interface Page {
  limit: number,
  page: number
}

export const getEndadressList = (params: Page & { end_name: string })=>(
  axios.request({
    url: '/site/endList',
    method: 'get',
    params
  })
)

export const getEndAdressOptions = ()=>(
  axios.request({
    url: '/site/getEnd',
    method: 'get',
  })
)

export const addEndadress = (params: { end_name: string;end_p_name?: string;end_p_phone?: string })=>(
  axios.request({
    url: '/site/endAdd',
    method: 'post',
    params
  })
)

export const editeEndadress = (params: { id: string|number; end_name: string;end_p_name?: string;end_p_phone?: string })=>(
  axios.request({
    url: '/site/endEdit',
    method: 'put',
    params
  })
)

export const deleteEndadress = (params: { id: string })=>(
  axios.request({
    url: '/site/endDel',
    method: 'post',
    params
  })
)
