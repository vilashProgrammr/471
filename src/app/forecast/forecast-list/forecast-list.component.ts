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

    /**
     * Class constructor.
     * @param {ActivatedRoute} route The active route.
     * @param {AlertsService} alertsService The alerts service for displaying alert messages to the user.
     * @param {ForecastService} forecastService The weather forecast API service.
     */
    constructor(
        private route: ActivatedRoute,
        private alertsService: AlertsService,
        public forecastService: ForecastService
    ) {
    }

    /**
     * Angular life-cycle event handler.
     * Binds to the route params observable. On each change of route params, assigns a new observable
     * to retrive the forecast from the API service for the cityId extracted from the route params.
     * It also taps into the returned value to select the first day of the forecast.
     */
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

    /**
     * Set the subject forecast as selected. This is bound to the forecast detaol component.
     * @param {IntervalForecastEx} forecast The subject interval forecast.
     */
    selectForecast(forecast: DailyForecast) {
        this.selectedForecast = forecast;
    }

    /**
     * Handle Http errors thrown by the API service by displaying alert messages to the user.
     * @param {HttpErrorResponse} err The Http response error thrown by the API service.
     */
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
