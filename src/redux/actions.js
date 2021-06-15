
export const ActionCreators = {

  addProfile: (user) => ({ type: 'ADD_USER', payload: { user } }),

  // updateProfileImage: (image) => ({ type: Types.UPDATE_PROFILE_PICTURE, payload: { image } }),

  // updateProfile: (user) => ({ type: Types.UPDATE_USER, payload: { user } }),

  // formSubmittionStatus: (status) => ({ type: Types.FORM_SUBMITION_STATUS, payload: { status }}),

  login: (user) => ({ type: 'LOGIN', payload: { user } })
}