import { IComment, IEmployee } from './types.d'
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
    data: params
  })

export const updateEmployee = (id:number, params: any) =>
  request({
    url: `/employee/${id}`,
    method: 'post',
    data: params
  })

export const deleteEmployee = (id: number) =>
  request({
    url: `/employee/${id}`,
    method: 'delete'
  })

export const commentEmployee = (id:number, params: any) =>
  request({
    url: `/employee/comment/${id}`,
    method: 'PUT',
    data: params
  })

export const findEmployeeComments = (id:number) =>
  request({
    url: `/employee/comment/${id}`,
    method: 'GET'
  })

export const defaultEmployeeData :IEmployee = {
  id: 0,
  name: ''
}

export const defaultCommentData:IComment = {
  id: 0,
  star: 5,
  content: '',
  commentBy: ''
}
