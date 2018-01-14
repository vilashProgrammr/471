import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import * as data from '../../data/forecast.json';
import { mapToForecastByDay } from '../../mappers/forecast-by-day-mapper';
import { CityForecast } from '../../models/city-forecast';
import { ForecastByDay } from '../../models/forecast-by-day';
import { ForecastService } from './forecast.service';

@Injectable()
export class ForecastStaticService extends ForecastService {
    /**
     * Get an observable of the static test forecast data.
     * The data is re-mapped to a more sutable structure ans also date properties
     * are added for each day to convert the unix timestamps to JS date objects.
     * @return {Observable<ForecastByDay>} An observable of the forecast data.
     */
    public getForecast(): Observable<ForecastByDay> {
        return of(data as any as CityForecast).pipe(
            map(cf => mapToForecastByDay(cf))
        );
    }
}
