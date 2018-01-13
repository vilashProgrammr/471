import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { DailyForecast, ForecastByDay } from '../../../models/forecast-by-day';
import { AlertsService } from '../../alerts/alerts.service';
import { ForecastService } from '../forecast.service';

@Component({
    selector: 'app-forecast-list',
    templateUrl: './forecast-list.component.html',
    styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent implements OnInit {
    public forecast$: Observable<ForecastByDay>;
    public selectedForecast: DailyForecast;

    constructor(
        private route: ActivatedRoute,
        private alertsService: AlertsService,
        public forecastService: ForecastService
    ) {
    }

    ngOnInit() {
        this.forecast$ = this.route.paramMap.pipe(
            switchMap(params => this.forecastService.getForecast(+params.get('cityId'))),
            tap(forecast => this.selectedForecast = forecast.dailyForecasts[0]),
            catchError((err: HttpErrorResponse) => {
                this.apiErrorHandler(err);
                return _throw(err);
            })
        );
    }

    selectForecast(forecast: DailyForecast) {
        this.selectedForecast = forecast;
    }

    private apiErrorHandler(err: HttpErrorResponse) {
        switch (err.status) {
            case 400:
                this.alertsService.showError('Error getting forecast', 'Is the city ID correct?');
                break;
            case 404:
                this.alertsService.showError('Error getting forecast', 'No city exists for that ID?');
                break;
            default:
                this.alertsService.showError('Error getting forecast', err.message);
        }
    }
}
