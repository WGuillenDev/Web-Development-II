import axios from 'axios';
import type { Location } from '../types/location.types.js';
import type { OpenMeteoResponse, Weather } from '../types/weather.types.js';

const api = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 5000,
});

// Open-Meteo devuelve la hora local del lugar sin zona ("2026-10-27T14:15"), así que se formatea tal cual
function formatTime(isoLocal: string): string {
  const [date = '', time = ''] = isoLocal.split('T');
  const [, month, day] = date.split('-');
  return `${day}/${month} a las ${time}`;
}

export async function getWeather(location: Location): Promise<Weather> {
  try {
    const { data } = await api.get<OpenMeteoResponse>('/forecast', {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        current: 'temperature_2m,wind_speed_10m,is_day',
        timezone: 'auto',
      },
    });

    return {
      ...location,
      temperature: data.current.temperature_2m,
      windSpeed: data.current.wind_speed_10m,
      updatedAt: formatTime(data.current.time),
      isDay: data.current.is_day === 1,
    };
  } catch (error) {
    console.error('Error al consultar Open-Meteo:', error instanceof Error ? error.message : error);
    throw new Error('No pudimos obtener el clima de tu zona. Revisa tu conexión a internet y recarga la página. Mientras tanto puedes usar el Chat global.');
  }
}
