import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
          const data = {
            error: error.error.errors ? error.error.errors : error.error,
            status: error.status
          };
          this.dialogService.openDialog(data);

          return throwError(error);
        })
      );
  }

}
