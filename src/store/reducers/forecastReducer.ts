import { createSlice } from "@reduxjs/toolkit";
import {getForecast, Forecast} from "../thunks/forecastThunks.ts";


interface ForecastState {
    loadedForecast: Forecast | null;
    history: string[];
    fetchingStatus:{
        errorMessage: string | null;
        loading:boolean;
    }
}

const savedHistory = localStorage.getItem('weatherHistory')

const initialState: ForecastState = {
    loadedForecast: null,
    history: savedHistory ? JSON.parse(savedHistory) : [],
    fetchingStatus:{
        errorMessage: null,
        loading: false,
    }
};

const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
        builder.addCase(getForecast.pending, (state) => {
            state.fetchingStatus.loading = true
        })
        builder.addCase(getForecast.rejected, (state,action) => {
            state.fetchingStatus.loading = false
            state.fetchingStatus.errorMessage = action.payload as string
        })
        builder.addCase(getForecast.fulfilled, (state,action) => {
            state.fetchingStatus.loading = false
            const receivedForecast = action.payload
            if(receivedForecast){
                state.fetchingStatus.errorMessage = null
                state.loadedForecast = action.payload;
                const {history} = state;
                if(history.length === 5){
                    state.history = [receivedForecast.name,...history.slice(0,-1)]
                }else {
                    state.history = [receivedForecast.name, ...history];

                }
                localStorage.setItem('weatherHistory', JSON.stringify(state.history))
            }
        })
    }
});
export default forecastSlice.reducer;
