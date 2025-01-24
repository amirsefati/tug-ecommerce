import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(`[${new Date().toISOString()}] LOG: ${message}`);
  }

  error(message: string, stack: any) {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
  }
}
