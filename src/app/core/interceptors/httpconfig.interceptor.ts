import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IError } from '../models/error.interface';
import { DialogService } from '../services/dialog.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(
    private dialogService: DialogService
  ) { }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error) => {
          const data: IError = {
            error: error.error.message ? error.error.message : error.error,
            status: error.status,
            errors: error.error.errors
          };
          this.dialogService.openDialog(data);

          return throwError(error);
        })
      );
  }

}
