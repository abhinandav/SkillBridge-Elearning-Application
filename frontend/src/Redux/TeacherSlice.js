import { createSlice } from '@reduxjs/toolkit';

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    teacherID: null,
  },
  reducers: {
    setTeacherData: (state, action) => {
      state.teacherData = action.payload.teacherID;
    },
  },
});

export const { setTeacherData } = teacherSlice.actions;

export default teacherSlice.reducer;
