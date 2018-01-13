import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface Alert {
    severity: 'error' | 'info' | 'success' | 'warning';
    message: string;
    detail: string;
}

@Injectable()
export class AlertsService {
    public alerts$ = new Subject<Alert>();

    showError(message: string, detail: string) {
        this.alerts$.next({ severity: 'error', message, detail });
    }

    showInfo(message: string, detail: string) {
        this.alerts$.next({ severity: 'info', message, detail });
    }

    showSuccess(message: string, detail: string) {
        this.alerts$.next({ severity: 'success', message, detail });
    }

    showWarning(message: string, detail: string) {
        this.alerts$.next({ severity: 'warning', message, detail });
    }
}
