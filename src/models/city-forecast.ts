export interface CityForecast {
    cod:     string;
    message: number;
    cnt:     number;
    list:    IntervalForecast[];
    city:    City;
}

export interface City {
    id:      number;
    name:    string;
    coord:   Coord;
    country: string;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface IntervalForecast {
    dt:      number;
    main:    MainWeather;
    weather: Weather[];
    clouds:  Clouds;
    wind:    Wind;
    snow:    Snow;
    sys:     Sys;
    dt_txt:  string;
}

export interface Clouds {
    all: number;
}

export interface MainWeather {
    temp:       number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    sea_level:  number;
    grnd_level: number;
    humidity:   number;
    temp_kf:    number;
}

export interface Snow {
    '3h'?: number;
}

export interface Sys {
    pod: Pod;
}

export enum Pod {
    D = 'd',
    N = 'n',
}

export interface Weather {
    id:          number;
    main:        WeatherMain;
    description: Description;
    icon:        string;
}

export enum Description {
    BrokenClouds = 'broken clouds',
    ClearSky = 'clear sky',
    FewClouds = 'few clouds',
    LightSnow = 'light snow',
    ScatteredClouds = 'scattered clouds',
}

export enum WeatherMain {
    Clear = 'Clear',
    Clouds = 'Clouds',
    Snow = 'Snow',
}

export interface Wind {
    speed: number;
    deg:   number;
}
