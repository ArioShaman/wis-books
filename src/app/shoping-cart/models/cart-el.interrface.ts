import { Book } from '../../books/models/book.model';

export interface ICartEl {
  book: Book;
  count: number;
}
