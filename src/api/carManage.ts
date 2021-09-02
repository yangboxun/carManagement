import { axios } from "@/libs/request";

export interface Page {
  limit: number,
  page: number
}

export const getCarList = (params: Page & { number_plate: string; motorcade_id: number|string })=>(
  axios.request({
    url: '/car/list',
    method: 'get',
    params
  })
)

export const addCar = (params: { number_plate: string;motorcade_id: number|string;driver_name: string;driver_phone: string})=>(
  axios.request({
    url: '/car/add',
    method: 'post',
    params
  })
)

export const editeCar = (params: { id: string|number; number_plate: string;motorcade_id: number|string;driver_name: string;driver_phone: string})=>(
  axios.request({
    url: '/car/edit',
    method: 'put',
    params
  })
)

export const deleteCar = (params: { id: string })=>(
  axios.request({
    url: '/car/del',
    method: 'post',
    params
  })
)
