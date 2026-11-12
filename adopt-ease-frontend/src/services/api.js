const API_BASE = '/api';

/**
 * Small fetch wrapper. All API calls go through Vite's /api proxy in dev.
 * Express session cookies are included so Passport authentication can work.
 */
export async function api(path, options = {}) {
  const { body, headers, ...rest } = options;
  const requestHeaders = new Headers(headers || {});

  let requestBody = body;
  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...rest,
    headers: requestHeaders,
    body: requestBody,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload?.message
        ? payload.message
        : typeof payload === 'string' && payload
          ? payload
          : `Request failed (${response.status})`;

    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export const get = (path) => api(path);
export const post = (path, body) => api(path, { method: 'POST', body });
export const put = (path, body) => api(path, { method: 'PUT', body });
export const del = (path) => api(path, { method: 'DELETE' });

export function getErrorMessage(error) {
  return error?.message || 'Something went wrong. Please try again.';
}
