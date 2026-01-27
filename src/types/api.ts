export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status: number;
  success: boolean;
}
