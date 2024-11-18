
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express"; // Ensure this import is included

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status: number = exception.getStatus();

    response.status(status).json({
      code: status,
      message:
        exception.message
        || (typeof exception.getResponse() === 'object' && exception.getResponse()['message'])
        || 'Internal Server Error',
      metadata: {
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }
}

