import { Pipe, PipeTransform } from '@angular/core';

import { Author } from '../../authors/models/author.model';
import { Book } from '../models/book.model';

@Pipe({
  name: 'filterByAuthor',
})
export class FilterByAuthorPipe implements PipeTransform {

  public transform(books: Book[], authorId: number): Book[] {
    if (books.length === 0 || authorId === undefined) {
      return books;
    }

    return books.filter(book => book.authorId === authorId);
  }

}
