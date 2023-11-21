import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    showCart: false 
}

const cartReducer = createReducer(initialState, ((builder) => {
    builder.addCase("showCart", (state) => {
        state.showCart = true
    } )
    .addCase("hideCart", (state) => {
        state.showCart = false 
    })

}))

export default cartReducer