import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "userinfo",
  //εε§ηΆζ
  initialState: {
    userInfo: {},
    Token: ''
  },
  reducers: {
    addInfo: (state, action) => {
      // console.log(action);
      // console.log(action.payload.userinfo);
      state.userInfo = action.payload.userinfo
      state.Token = action.payload.token
    },
    getToken: (state, action) => {
      return state.Token
    },
    deleteInfo: (state, action) => {
      state.userInfo = ''
      state.Token = ''
    }
  }
})

export const { addInfo,getToken,deleteInfo} = UserSlice.actions
export default UserSlice.reducer