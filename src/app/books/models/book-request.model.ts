import { Alias, Model } from 'tsmodels';

import { Author } from '../../authors/models/author.model';
import { Genre } from '../../genres/models/genre.model';

export class BookRequest extends Model {

  @Alias() public title: string;
  @Alias() public description: string;
  @Alias() public author: Author;
  @Alias() public genres: Genre[];
  @Alias() public writingDate: Date;
  @Alias() public releaseDate: Date;
  @Alias() public price: number;

}
