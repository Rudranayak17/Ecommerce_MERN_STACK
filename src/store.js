/* eslint-disable no-unused-vars */
import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer,  productReducer, productsReducer } from "./reducers/productReducer";
import {   allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/CARTrEDUCER.JS";
import { AllOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailReducer, orderReducer } from "./reducers/orderReducer";


// Import your reducers here
// For example:
// import someReducer from "./someReducer";

// Combine your reducers
const reducer = combineReducers({
products:productsReducer,
productDetails:productDetailsReducer,

user:userReducer,
profile:profileReducer,
forgotPassword:forgotPasswordReducer,
cart:cartReducer,
newOrder:newOrderReducer,
myOrders:myOrdersReducer,
orderDetails:orderDetailReducer,
newReview:newReviewReducer,
newProduct:newProductReducer,
product:productReducer,
allorders:AllOrdersReducer,
order:orderReducer,
allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
});

let initialState = {
  cart:{
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("cartItems")):{}
  }
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: [...middleware],

});

export default store;
