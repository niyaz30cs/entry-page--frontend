import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../ReduxSlice/UserSlice";
const myStore = configureStore({
    reducer :{
       User : UserSlice
    }
});

export default myStore;