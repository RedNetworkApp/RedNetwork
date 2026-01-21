//import { createStore } from "redux"
//import { configureStore } from "@reduxjs/toolkit"
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux"
//import  cartReducer from "./cartRedux";
import { cartReducer } from "./reducer"
import { persistStore, persistReducer,  FLUSH,  REHYDRATE,  PAUSE,  PERSIST,  PURGE,  REGISTER,} from "redux-persist";
import storage from "redux-persist/lib/storage";
//import root from "./main"

//const store = createStore(root)
//export default store

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userReducer,  cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
