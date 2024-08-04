    import { configureStore } from "@reduxjs/toolkit";
    import  useReducer  from "./UserSlice";


    const store = configureStore({
        reducer: {
            user : useReducer
        }
    });

    export default store;