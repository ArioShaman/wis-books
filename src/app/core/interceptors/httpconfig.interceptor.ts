import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Router } from '@angular/router'

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IDialogBody } from '../models/dialog-body.interface';
import { DialogService } from '../services/dialog.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(
    private dialogService: DialogService,
    private router: Router
  ) { }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error) => {
          let data: IDialogBody;
          if (error.error.errors) {
            data = {
              message: error.error.message ? error.error.message : error.error,
              type: 'error-array',
              payload: {
                status: error.status,
                errors: error.error.errors
              }
            };
          } else {
            data = {
              message: error.error.message ? error.error.message : error.error,
              type: 'error',
              payload: {
                status: error.status
              }
            };
          }
          // const data: IDialogBody = 
          this.dialogService.openDialog(data)
            .subscribe(
              (res) => {
                if (error.status === 404) {
                  this.router.navigate(['/books']);
                }
              }
            );

          return throwError(error);
        })
      );
  }

}
