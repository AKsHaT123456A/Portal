import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    logintime: 0,
    studentNo: "",
    category: "",
    isAdmin: false,
    isSubmit: false,
};

const AddStudentSlice = createSlice({
    name: "addStudent",
    initialState,
    reducers: {
        AddStudent: (state, action) => {
            // Store the student data directly in the state
            state._id = action.payload._id;
            state.studentNo = action.payload.studentNo;
            state.category = action.payload.category;
            state.isAdmin = action.payload.isAdmin;
            state.isSubmit = action.payload.isSubmit;
            state.logintime = action.payload.logintime;
        }
    }
});

export default AddStudentSlice.reducer;
export const { AddStudent } = AddStudentSlice.actions;
