import mercurius from 'mercurius';

const { ErrorWithProps } = mercurius;

export const handleResponseError = (err: unknown) => {
  if (err instanceof ErrorWithProps) {
    return {
      status: err.statusCode || 500,
      message: err.message,
    };
  }

  return {
    status: 500,
    message: 'server error',
  };
};
