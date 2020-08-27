import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class DomainInterceptor implements HttpInterceptor {

  protected API_URL: string = environment.hosts.api_host;

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiReq = req.clone({
      url: `${this.API_URL}/api${req.url}`
    });

    return next.handle(apiReq);
  }

}
