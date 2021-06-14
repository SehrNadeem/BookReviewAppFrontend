import { createSlice } from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState:{ 
    username: '', 
    firstName: '', 
    lastName: '' 
  },
  reducers: {
    setCurrentUser: (state, action) => {
      const todo = {
        id: new Date(),
        title: action.payload.title,
        completed: false,
      };
      state.push(todo);
    },

  },
});


export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;