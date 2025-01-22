import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'
import counterReducer from "./counterSlice"

import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { combineReducers } from '@reduxjs/toolkit'

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ['user']
}

const reducer = combineReducers({
    user: userReducer,
})

const userReducerPersist = persistReducer(persistConfig, reducer)

export default configureStore({
    reducer: userReducerPersist,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})