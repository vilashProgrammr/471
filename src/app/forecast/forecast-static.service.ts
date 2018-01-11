import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import * as data from '../../data/forecast.json';
import { CityForecast } from '../../models/city-forecast';
import { ForecastByDay } from './forecast-by-day.class';
import { ForecastService } from './forecast.service';

@Injectable()
export class ForecastStaticService extends ForecastService {
    public getForecast(): Observable<ForecastByDay> {
        return of(data as any as CityForecast).pipe(
            map(cf => new ForecastByDay().initializeFromCityForecast(cf))
        );
    }
}
