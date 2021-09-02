import { axios } from "@/libs/request";

export interface Page {
  limit: number,
  page: number
}

export const getCarTeamList = (params: Page & { c_name: string })=>(
  axios.request({
    url: '/motorcade/list',
    method: 'get',
    params
  })
)
export const getCarTeamOptions = ()=>(
  axios.request({
    url: '/motorcade/getMotorcade',
    method: 'get',
  })
)


export const addCarTeam = (params: { c_name: string;p_name: string; p_phone: string})=>(
  axios.request({
    url: '/motorcade/add',
    method: 'post',
    params
  })
)

export const editeCarTeam = (params: { id: string|number; c_name: string;p_name: string; p_phone: string})=>(
  axios.request({
    url: '/motorcade/edit',
    method: 'put',
    params
  })
)

export const deleteCarTeam = (params: { id: string })=>(
  axios.request({
    url: '/motorcade/del',
    method: 'post',
    params
  })
)
