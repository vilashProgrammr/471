import { CityForecast } from '../models/city-forecast';
import { ForecastByDay, IntervalForecastEx } from '../models/forecast-by-day';

export function mapToForecastByDay(cityForecast: CityForecast): ForecastByDay {
    const city = cityForecast.city;

    const dayMap = new Map<string, IntervalForecastEx[]>();
    cityForecast.list.forEach(f => {
        const date = new Date(f.dt * 1000);
        const day = date.toISOString().substring(0, 10);
        const intervalForecast = { date, ...f } as IntervalForecastEx;
        if (dayMap.has(day)) {
            dayMap.get(day).push(intervalForecast);
        } else {
            dayMap.set(day, [intervalForecast]);
        }
    });

    const dailyForecasts = Array.from(dayMap.entries()).map(([d, forecasts]) => {
        return { date: new Date(d), forecasts };
    });

    return { city, dailyForecasts };
}
