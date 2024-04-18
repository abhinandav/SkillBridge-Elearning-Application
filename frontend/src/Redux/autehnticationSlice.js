import {createSlice} from '@reduxjs/toolkit'

export const authenticationSlice=createSlice({
    name:'authentication_user',
    initialState:{
        userid:null,
        name:null,
        isAuthenticated:false,
        isAdmin:false,
        isTeacher:false,
        // isActive:false
        
    },
    reducers:{
        set_authentication:(state,action)=>{
            state.userid=action.payload.userid
            state.name=action.payload.name
            state.isAuthenticated=action.payload.isAuthenticated
            state.isAdmin=action.payload.isAdmin
            state.isTeacher=action.payload.isTeacher
            // state.isActive=action.payload.isActive


        }
    }
})

export const {set_authentication}=authenticationSlice.actions
export default authenticationSlice.reducer