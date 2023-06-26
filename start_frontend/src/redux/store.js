import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slices/counterSlice'
import { logger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { createStore, applyMiddleware, compose } from 'redux';
import { createStateSyncMiddleware } from 'redux-state-sync';
import { persistStore } from 'redux-persist';

import createRootReducer from './redux/store/reducers/rootReducer';
import actionTypes from './redux/store/actions/actionTypes';

const environment = process.env.NODE_ENV || "development";
let isDevelopment = environment === "development";

//hide redux logs
isDevelopment = false;

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
})