
const initialState = {
  user: {
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  }
  
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    console.log('login', action.payload)
    return {
      ...state,
      user: action.payload
    }
  case 'ADD_USER':
    return {
      ...state,
      user: action.payload
    }
  default:
    return state;
  }
}

export default userReducer;