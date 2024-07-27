export default function errorResponse(message: string) {
  return {
    error: true,
    message,
    result: null,
  };
}
