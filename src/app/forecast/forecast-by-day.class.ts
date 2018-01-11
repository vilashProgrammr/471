import { City, CityForecast, IntervalForecast } from '../../models/city-forecast';

export interface IntervalForecastEx extends IntervalForecast {
    date: Date;
}

export interface DailyForecast {
    date: Date;
    forecasts: IntervalForecastEx[];
}

export class ForecastByDay {
    public city: City;
    public dailyForecasts: DailyForecast[];

    initializeFromCityForecast(cityForecast: CityForecast): ForecastByDay {
        this.city = cityForecast.city;

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

        this.dailyForecasts = Array.from(dayMap.entries()).map(([d, forecasts]) => {
            return { date: new Date(d), forecasts };
        });

        return this;
    }
}
