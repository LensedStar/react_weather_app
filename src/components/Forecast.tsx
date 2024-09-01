import SearchInput from "./ForecastComponets/SearchInput.tsx";
import SearchHistory from "./ForecastComponets/SearchHistory.tsx";
import {getForecast} from "../store/thunks/forecastThunks.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import ErrorMessage from "./ErrorMessage.tsx";
import "../styles/forecustStyle.scss"
import {useEffect} from "react";


const Forecast = () => {
    const dispatch = useAppDispatch();
    const {loadedForecast,history,fetchingStatus} = useAppSelector(state => state.forecast);
    const {errorMessage,loading} = fetchingStatus

    useEffect(() => {
       if(history.length){
            const lastSearch = history[0]
            dispatch(getForecast(lastSearch))
       }
    },[])

    const getForecastByName = (value: string) => {
       if(value) dispatch(getForecast(value))
    }
    return (
        <div className="forecast-wrapper">
            <h1>React weather app</h1>
            <SearchInput handleSearch={getForecastByName} />
    <main className="forecast-container">
        <article className="current-location-forecast">
            {
                loading
                    ? (
                        <div className="loading">
                            <h1>Loading...</h1>
                        </div>
                    ) : errorMessage
                        ? (
                            <ErrorMessage errorText={errorMessage}/>
                        ) : loadedForecast
                            ? (
                                <div className="forecast-list">
                                    <h2>{loadedForecast.name}</h2>
                                    <ul>
                                        <li>Temperature: {loadedForecast.main.temp}</li>
                                        <li>Feels Like: {loadedForecast.main.feels_like}</li>
                                        <li>Min temperature: {loadedForecast.main.temp_min}</li>
                                        <li>Max temperature: {loadedForecast.main.temp_max}</li>
                                        <li>Humidity: {loadedForecast.main.humidity}</li>
                                    </ul>
                                </div>
                            ) : null
            }
        </article>
        <article className="search-history-container">
            <SearchHistory handleClick={getForecastByName} />
        </article>
    </main>
        </div>
    )
};
export default Forecast;
