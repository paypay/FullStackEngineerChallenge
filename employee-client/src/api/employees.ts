import request from '@/utils/request'

export const getEmployees = (params: any) =>
  request({
    url: '/employee/',
    method: 'get',
    params
  })

export const createEmployee = (params: any) =>
  request({
    url: '/employee/',
    method: 'put',
    params
  })

export const updateEmployee = (id:number, params: any) =>
  request({
    url: `/employee/${id}`,
    method: 'post',
    params
  })

export const deleteEmployee = (id: number) =>
  request({
    url: `/employee/${id}`,
    method: 'delete'
  })

export const defaultEmployeeData = {
  id: 0,
  name: ''
}
