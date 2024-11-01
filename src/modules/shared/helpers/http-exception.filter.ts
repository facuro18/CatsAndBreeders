import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { errors } from './errors.config';

@Catch() // Este decorador sin parámetros captura cualquier error
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let errorResponse: any;

    // Si la excepción es de tipo HttpException, podemos obtener el estado y la respuesta personalizada
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorResponse = exception.getResponse();
    } else {
      // Si es un error desconocido, asignamos un estado 500
      status = errors.serverError.statusCode;
      errorResponse = {
        statusCode: errors.serverError.statusCode,
        message: errors.serverError.message,
        error: errors.serverError.error,
      };
    }

    this.logger.error(`${request.method} ${request.originalUrl} ${status} error: ${exception}`);

    response.status(status).json({
      error: true,
      errorDetails: errorResponse,
    });
  }
}
