import type { Location } from './location.types.js';

// Respuesta de Open-Meteo con las variables pedidas en el parámetro current
export interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
    is_day: number;
  };
}

// Datos que recibe la vista del clima
export interface Weather extends Location {
  temperature: number;
  windSpeed: number;
  updatedAt: string;
  isDay: boolean;
}
