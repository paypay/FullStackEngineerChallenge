import request from '@/utils/request'

const MOCK_BASE = ''

export const getUserInfo = (data: any) =>
  request({
    url: MOCK_BASE + '/users/info',
    method: 'post',
    data
  })

export const login = (data: any) =>
  request({
    url: MOCK_BASE + '/users/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: MOCK_BASE + '/users/logout',
    method: 'post'
  })
