import { useCallback, useState } from 'react';
import type { ApiResponse } from 'src/types/api.type';
import { HttpError, ParseError, NetworkError } from 'src/types/error.type';
type ServiceMethod<ServiceArguments extends unknown[], ServiceData> = (
  ...args: ServiceArguments
) => Promise<ApiResponse<ServiceData>>;

export function useApi<ServiceArguments extends unknown[], ServiceData>(
  serviceMethod: ServiceMethod<ServiceArguments, ServiceData>
) {
  const [data, setData] = useState<ServiceData | undefined>(undefined);
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (...args: ServiceArguments) => {
      setLoading(true);
      setError(null);
      setStatus(null);
      try {
        const response = await serviceMethod(...args);
        setData(response.data);
        setStatus(response.status);
        setMessage(response.message);
      } catch (error) {
        setData(undefined);
        setMessage(undefined);
        if (error instanceof Error) {
          setError(error.message);
        }
        if (error instanceof HttpError) {
          setMessage(error.data as string);
          setStatus(error.status);
        } else if (error instanceof ParseError) {
          setStatus(null);
        } else if (error instanceof NetworkError) {
          setStatus(null);
        }
      } finally {
        setLoading(false);
      }
    },
    [serviceMethod]
  );

  const reset = () => {
    setData(undefined);
    setStatus(null);
    setMessage(undefined);
    setError(null);
    setLoading(false);
  };

  return { data, status, message, error, loading, request, reset };
}
