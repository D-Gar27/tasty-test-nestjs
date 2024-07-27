export interface ApiResponse<T> {
  error: null;
  message: string;
  result: T;
  statusCode: number;
}

export default function returnResponse(
  result: unknown,
  message: string,
  statusCode: number,
) {
  return {
    error: null,
    message,
    result,
    statusCode,
  };
}
