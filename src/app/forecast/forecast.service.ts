import { Observable } from 'rxjs/Observable';
import { ForecastByDay } from './forecast-by-day.class';

export abstract class ForecastService {
    abstract getForecast(cityId: number): Observable<ForecastByDay>;
}
