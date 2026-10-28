// Respuesta de ip-api.com con los campos pedidos en el parámetro fields
export interface IpApiResponse {
  status: 'success' | 'fail';
  message?: string;
  country: string;
  regionName: string;
  city: string;
  lat: number;
  lon: number;
}

export interface Location {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}
