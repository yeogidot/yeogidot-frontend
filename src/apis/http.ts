const BASE_URL = '';

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
  body?: unknown
) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method,
      body:
        body instanceof FormData || body === undefined
          ? body
          : JSON.stringify(body),
      headers,
    });
    if (!response.ok) {
      throw new Error(
        `네트워크 응답 오류 발생. 오류 코드 : ${response.status}`
      );
    }
    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    console.error(`에러 발생 : ${error}`);
  }
};

export const http = {
  get: async <T>(url: string, headers?: Record<string, string>) => {
    return request<T>('GET', url, headers);
  },
  post: async <T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ) => {
    return request<T>('POST', url, headers, body);
  },
  put: async <T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ) => {
    return request<T>('PUT', url, headers, body);
  },
  delete: async <T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ) => {
    return request<T>('DELETE', url, headers, body);
  },
};
