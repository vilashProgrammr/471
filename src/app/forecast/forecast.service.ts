import { Observable } from 'rxjs/Observable';
import { ForecastByDay } from '../../models/forecast-by-day';

export abstract class ForecastService {
    abstract getForecast(cityId: number): Observable<ForecastByDay>;
}
