import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { GenresService } from '../../core/services/genres.service';
import { Genre } from '../../genres/models/genre.model';

@Injectable()
export class GenreResolve implements Resolve<Genre> {

  constructor(private readonly genresService: GenresService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Genre> {
    return this.genresService.getGenreById(route.params.id);
  }

}
