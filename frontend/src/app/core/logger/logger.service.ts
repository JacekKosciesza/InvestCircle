import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(msg: any, ...optionalParams: any[]): void {
    console.log(msg);
  }

  error(msg: any, ...optionalParams: any[]): void {
    console.error(msg);
  }
}
