import Cookie from 'js-cookie'

const getToken = ()=>{
  const token = Cookie.get('Y_token')
  if (token) return token
  else return false
}

const setToken = (token: string) =>{
  Cookie.set('Y_token',token, { expires: 1 })
}


const regexp = {
  phone: /^1(3|4|5|6|7|8|9)\d{9}$/
}

export default {
  setToken,
  getToken,
  regexp
}
