import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export interface Forecast {
    name: string;
    main:{
        temp:number,
        feels_like:number,
        temp_min:number,
        temp_max:number,
        humidity:number,
    }
}

const API_KEY:string = "369d58e956083093d0ca54d49342f484"
const API_BASE:string = "https://api.openweathermap.org/data/2.5"

export const getForecast = createAsyncThunk<
    Forecast,
    string,
    {rejectValue:string}
>(
    'forecast/fetchMultipleForecasts',
    async (cityName:string,{rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_BASE}/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
            return response.data as Forecast;
        } catch (error:unknown) {
            if(axios.isAxiosError(error)){
                if (error.response && error.response.status === 404) {
                    return rejectWithValue('City not found');
                }
            }
            return rejectWithValue('Failed to fetch forecast data');
        }
    }
);
