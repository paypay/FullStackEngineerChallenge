const API_URL = 'http://localhost:3000'

let profile = {}
let token = ''

if (process.client) {
  try {
    token = window.localStorage.token
    profile = JSON.parse(window.localStorage.profile)
  } catch (e) {
    token = ''
    profile = {}
  }
}

const getToken = () => token

export const getProfile = () => ({ ...profile })

const setToken = (n) => {
  token = n
  if (process.client) {
    window.localStorage.token = n
  }
}

const setProfile = (p) => {
  profile = p
  if (process.client) {
    window.localStorage.profile = JSON.stringify(p)
  }
}

export const request = async (path, body, method) => {
  const authHeaders = getToken() ? { authorization: `Bearer ${getToken()}` } : {}
  return await fetch(`${API_URL}${path}`, body ? {
    method: method || 'POST',
    headers: {
      'content-type': 'application/json',
      ...authHeaders
    },
    body: JSON.stringify(body)
  } : { headers: authHeaders }).then(r => r.json())
}

export const isLoggedIn = () => !!getToken()

export const isAdmin = () => profile.isAdmin

export const logout = () => {
  if (!process.client) {
    return false
  }
  setToken('')
  setProfile('')
  document.location.reload()
}

export const login = async (login, password) => {
  try {
    const r = await request('/login', { login, password })
    setToken(r.token)
    setProfile(r.profile)
    document.location.href = '/'
  } catch (e) {
    alert('Failed!')
  }
}
