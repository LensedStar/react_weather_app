import {configureStore} from "@reduxjs/toolkit";
import forecastReducer from "./reducers/forecastReducer.ts";


export const store = configureStore({
        reducer: {
            forecast: forecastReducer,
        }
    }
)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']