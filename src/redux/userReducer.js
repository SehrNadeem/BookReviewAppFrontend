
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
      //action.payload,
      // formSubmitted: false // after update user formsubmition reset
    }
  // case Types.UPDATE_USER:
  //   return {
  //     ...state,
  //     profile: action.payload.user,
  //     formSubmitted: false // after update user formsubmition reset
  //   }
  // case Types.UPDATE_PROFILE_PICTURE:
  //   return {
  //     ...state,
  //     profile: {
  //       ...state.profile,
  //       profileImage: action.payload.image
  //     }
  //   }
  // case Types.FORM_SUBMITION_STATUS:
  //   return {
  //     ...state,
  //     formSubmitted: action.payload.status
  //   }
  default:
    return state;
  }
}

export default userReducer;