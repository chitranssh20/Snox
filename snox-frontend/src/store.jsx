import cartReducer from "./Reducers/cartReducer";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : {
        cartReducer: cartReducer
    }
})
export default store