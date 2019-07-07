import Axios, { AxiosRequestConfig } from 'axios'
import { showAlert } from '~/components/Modals'

type Service = 'employee' | 'admin'

const apiBase = {
  employee: '/api/v1',
  admin: '/api/admin/v1'
}

interface APIError {
  message: string
  code: string
}

const request = async (
  service: Service,
  config: AxiosRequestConfig
): Promise<[null | APIError, any]> => {
  let res: [null | APIError, object] = [null, {}]
  config.url = apiBase[service] + config.url

  try {
    const { data } = await Axios(config)
    res = [null, data]
  } catch (e) {
    // TODO: better error messages from API response
    if (e.message === 'Network Error' || !e.response) {
      res = [
        {
          code: 'network.error',
          message: 'Network Error, please check'
        },
        {}
      ]
    } else if (e.response.status === 400) {
      res = [
        {
          code: 'request.malformed',
          message: 'Request data is not valid'
        },
        {}
      ]
    } else if (e.response.status === 401) {
      res = [
        {
          code: 'auth.required',
          message: 'Please login'
        },
        {}
      ]
    } else if (e.response.status === 403) {
      res = [
        {
          code: 'auth.forbidden',
          message: 'Please relogin with proper account'
        },
        {}
      ]
    } else {
      res = [
        {
          code: 'unexpected',
          message: 'Unexpected error'
        },
        {}
      ]
    }
  }

  // if there is error
  if (res[0] !== null) {
    showAlert({ message: res[0].message })
  }

  return res
}

export default {
  get(service: Service, pathname: string, params?: object) {
    return request(service, { method: 'get', url: pathname, params })
  },
  delete(service: Service, pathname: string, params?: object) {
    return request(service, { method: 'delete', url: pathname, params })
  },
  put(service: Service, pathname: string, data?: object) {
    return request(service, { method: 'put', url: pathname, data })
  },
  post(service: Service, pathname: string, data?: object) {
    return request(service, { method: 'post', url: pathname, data })
  }
}
