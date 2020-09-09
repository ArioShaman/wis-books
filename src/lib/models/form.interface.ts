import { Author } from '../../app/authors/models/author.model';

export interface IForm {
  title: string;
  description: string;
  author: Author;
  genres: [];
  writingDate: Date;
  releaseDate: Date;
  price: number;
}
