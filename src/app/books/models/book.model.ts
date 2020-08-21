import { Alias, Model } from 'tsmodels';

import { Genre } from '../../genres/models/genre.model';

export class Book extends Model {

  @Alias() public id: number;
  @Alias() public description: string;
  @Alias() public title: string;
  @Alias() public price: number;
  @Alias() public genres: Genre[];
  @Alias() public previews: [];
  @Alias() public image: string;

  @Alias('author_id') public authorId: number;
  @Alias('writing_date') public writingDate: string;
  @Alias('release_date') public releaseDate: string;

}

