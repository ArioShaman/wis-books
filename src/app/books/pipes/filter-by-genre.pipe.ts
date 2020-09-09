import { Pipe, PipeTransform } from '@angular/core';

import { Book } from '../models/book.model';

@Pipe({
  name: 'filterByGenre',
})
export class FilterByGenrePipe implements PipeTransform {

  public transform(books: Book[], genreId: number): Book[] {
    if (books.length === 0 || genreId === undefined) {
      return books;
    }

    return books.filter(
      (book) => {
        return book.genres.findIndex(
          genre => genre.id === genreId,
        ) !== -1;
      },
    );
  }

}
