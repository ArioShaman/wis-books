import { Pipe, PipeTransform } from '@angular/core';

import { Book } from '../models/book.model';

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

  public transform(books: Book[], searchValue: string): unknown {

    if (
      books.length === 0 ||
      searchValue === undefined ||
      searchValue.length === 0
    ) {
      return books;
    }

    return books.filter(
      (book) => {
        if (
          book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.description.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          return book;
        }
      }
    );
  }

}
