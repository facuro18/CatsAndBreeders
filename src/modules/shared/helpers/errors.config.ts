export const errors = {
  validationFailed: { statusCode: 400, message: 'Validation Failed', error: 'Bad Request' },
  notFound: { statusCode: 404, message: 'Resource not found', error: 'Not Found' },
  requestConflict: {
    statusCode: 409,
    message: 'The request could not be completed due to a conflict with the current state of the resource',
    error: 'Requesst Conflict',
  },
  serverError: { statusCode: 500, message: 'An unexpected error occurred', error: 'Server Error' },
} as const;
