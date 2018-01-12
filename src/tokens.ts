
import { InjectionToken } from '@angular/core';
import { DailyForecast } from './app/forecast/forecast-by-day.class';
import { ICacheAdapter } from './lib/caching/cache-adapter';

export const FORECAST_CACHE_ADAPTER = new InjectionToken<ICacheAdapter<number, DailyForecast>>('forecastCacheAdapter');
export const DB_FACTORY = new InjectionToken<IDBFactory>('dbFactory');
