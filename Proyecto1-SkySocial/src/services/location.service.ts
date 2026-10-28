import axios from 'axios';
import type { IpApiResponse, Location } from '../types/location.types.js';

// La versión gratuita de ip-api solo atiende peticiones por HTTP
const api = axios.create({
  baseURL: 'http://ip-api.com/json',
  timeout: 5000,
});

const FIELDS = 'status,message,country,regionName,city,lat,lon';

// Ubicación de respaldo definida en el .env, por si ip-api no responde
function fallbackLocation(): Location {
  return {
    city: process.env.DEFAULT_CITY ?? 'San Carlos',
    region: process.env.DEFAULT_REGION ?? 'Alajuela',
    country: process.env.DEFAULT_COUNTRY ?? 'Costa Rica',
    latitude: Number(process.env.DEFAULT_LAT ?? 10.3239),
    longitude: Number(process.env.DEFAULT_LON ?? -84.4301),
  };
}

// IPs de la propia máquina o de la red local, que ip-api no puede ubicar
function isPrivateIp(ip: string): boolean {
  return (
    ip === '' ||
    ip === '::1' ||
    ip.startsWith('127.') ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
  );
}

export async function getLocation(ip: string): Promise<Location> {
  // Sin IP en la ruta, ip-api responde con la ubicación de la IP pública del servidor
  const target = isPrivateIp(ip) ? '' : ip;

  try {
    const { data } = await api.get<IpApiResponse>(`/${target}`, {
      params: { fields: FIELDS, lang: 'es' },
    });

    if (data.status !== 'success') {
      throw new Error(data.message ?? 'ip-api no pudo ubicar la IP');
    }

    return {
      city: data.city,
      region: data.regionName,
      country: data.country,
      latitude: data.lat,
      longitude: data.lon,
    };
  } catch (error) {
    console.error('Error al consultar ip-api, se usa la ubicación de respaldo:', error instanceof Error ? error.message : error);
    return fallbackLocation();
  }
}
