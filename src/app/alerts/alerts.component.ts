import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Alert, AlertsService } from './alerts.service';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnDestroy, OnInit {
    public alerts: Alert[] = [];
    private subscription: ISubscription;

    constructor(private alertsService: AlertsService) {
    }

    ngOnInit() {
        this.subscription = this.alertsService.alerts$.subscribe(a => this.alerts.push(a));
    }

    ngOnDestroy() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    getAlertSeverityClass(alert: Alert): string {
        switch (alert.severity) {
            case 'error':
                return 'alert-danger';
            case 'info':
                return 'alert-info';
            case 'success':
                return 'alert-success';
            case 'warning':
                return 'alert-warning';
        }
    }

    remove(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }
}
