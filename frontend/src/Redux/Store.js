import { configureStore } from "@reduxjs/toolkit";
import autehnticationSliceReducer from "./autehnticationSlice";



export default configureStore({
    reducer:{
        authentication_user:autehnticationSliceReducer,
    }
})