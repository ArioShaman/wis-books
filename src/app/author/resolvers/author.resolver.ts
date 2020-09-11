import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthorsService } from '../../core/services/authors.service';
import { Author } from '../../authors/models/author.model';

@Injectable()
export class AuthorResolve implements Resolve<Author> {

  constructor(private readonly authorsService: AuthorsService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Author> {
    return this.authorsService.getAuthorById(route.params.id);
  }

}
