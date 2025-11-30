/**
 * Cliente HTTP base para comunicarse con la API
 */

const API_BASE_URL = '/api';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
};

export const api = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error en la petición');
  }

  return data;
};

// Helpers específicos
export const get = <T>(endpoint: string) => api<T>(endpoint);
export const post = <T>(endpoint: string, body: unknown) => api<T>(endpoint, { method: 'POST', body });
export const put = <T>(endpoint: string, body: unknown) => api<T>(endpoint, { method: 'PUT', body });
export const del = <T>(endpoint: string) => api<T>(endpoint, { method: 'DELETE' });
