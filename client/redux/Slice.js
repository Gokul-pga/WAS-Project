const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  fetchUserData: {},
  fetchAdminData: {},
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setAdminData: (state, { payload }) => {
      state.fetchAdminData = payload;
    },
  },
});

export default userSlice.reducer;
export const { setAdminData } = userSlice.actions;
