import { configureStore } from "@reduxjs/toolkit";
import autehnticationSliceReducer from "./autehnticationSlice";
import userProfileSliceReducer from './ProfileSlice'




export default configureStore({
    reducer:{
        authentication_user:autehnticationSliceReducer,
        profile_details:userProfileSliceReducer
    }
})