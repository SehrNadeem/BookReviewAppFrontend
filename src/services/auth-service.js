import API from './api';

export const signUp = user => {
  return API.post(`users`, {
    username: user.username,
    password: user.password,
    first_name: user.firstName,
    last_name: user.lastName
  }, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })

}

export const signIn = (user) => {
  return API.post(`authenticate`, {
    username: user.username,
    password: user.password
  }, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
}

export const userLoggedIn = (token) => {
  return API.get(`profile`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}