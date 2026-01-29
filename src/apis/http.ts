import type { ApiResponse } from 'src/types/api.type';
import { HttpError, NetworkError, ParseError } from 'src/types/error.type';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  token?: string,
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
  body?: unknown
): Promise<ApiResponse<T>> => {
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${url}`, {
      method,
      body:
        body instanceof FormData || body === undefined
          ? body
          : JSON.stringify(body),
      headers,
    });
  } catch (e) {
    throw new NetworkError(e instanceof Error ? e.message : '네트워크 에러');
  }
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  const responseBodyText = await response.text();
  let responseData: T | undefined;

  try {
    responseData = isJson ? JSON.parse(responseBodyText) : undefined;
  } catch (error) {
    throw new ParseError('응답 JSON 파싱 에러');
  }

  if (!response.ok) {
    throw new HttpError('HTTP 에러', response.status, responseBodyText);
  }

  return {
    data: responseData,
    status: response.status,
    message: responseData ? undefined : responseBodyText,
  };
};
export const http = {
  get: async <T>(
    url: string,
    token?: string,
    headers?: Record<string, string>
  ) => {
    return request<T>('GET', url, token, headers);
  },
  post: async <T>(
    url: string,
    body: unknown,
    token?: string,
    headers?: Record<string, string>
  ) => {
    return request<T>('POST', url, token, headers, body);
  },
  put: async <T>(
    url: string,
    body: unknown,
    token?: string,
    headers?: Record<string, string>
  ) => {
    return request<T>('PUT', url, token, headers, body);
  },
  delete: async <T>(
    url: string,
    body: unknown,
    token?: string,
    headers?: Record<string, string>
  ) => {
    return request<T>('DELETE', url, token, headers, body);
  },
  patch: async <T>(
    url: string,
    body: unknown,
    token?: string,
    headers?: Record<string, string>
  ) => {
    return request<T>('PATCH', url, token, headers, body);
  },
};
