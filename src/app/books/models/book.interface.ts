import { IGenre } from '../../genres/models/genre.interface';

export interface IBook {
  id: number;
  description: string;
  author_id: number;
  title: string;
  price: number;
  genres: IGenre[];
  previews: Object[];
  image: string;
  writing_date: string;
  release_date: string;
}
