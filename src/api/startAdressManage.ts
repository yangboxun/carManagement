import { axios } from "@/libs/request";

export interface Page {
  limit: number,
  page: number
}

export const getStartadressList = (params: Page & { outset_name: string })=>(
  axios.request({
    url: '/site/outsetList',
    method: 'get',
    params
  })
)

export const addStartadress = (params: { outset_name: string;outset_p_name?: string;outset_p_phone?: string })=>(
  axios.request({
    url: '/site/outsetAdd',
    method: 'post',
    params
  })
)

export const editeStartadress = (params: { id: string|number; outset_name: string;outset_p_name?: string;outset_p_phone?: string })=>(
  axios.request({
    url: '/site/outsetEdit',
    method: 'put',
    params
  })
)

export const deleteStartadress = (params: { id: string })=>(
  axios.request({
    url: '/site/outsetDel',
    method: 'post',
    params
  })
)
