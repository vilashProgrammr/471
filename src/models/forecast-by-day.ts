import { City, IntervalForecast } from './city-forecast';

export interface IntervalForecastEx extends IntervalForecast {
    date: Date;
}

export interface DailyForecast {
    date: Date;
    forecasts: IntervalForecastEx[];
}

export interface ForecastByDay {
    city: City;
    dailyForecasts: DailyForecast[];
}
