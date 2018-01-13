
import { InjectionToken } from '@angular/core';
import { ICacheAdapter } from './lib/caching/cache-adapter';
import { DailyForecast } from './models/forecast-by-day';

export const FORECAST_CACHE_ADAPTER = new InjectionToken<ICacheAdapter<number, DailyForecast>>('forecastCacheAdapter');
export const DB_FACTORY = new InjectionToken<IDBFactory>('dbFactory');
