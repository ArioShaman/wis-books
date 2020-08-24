import { Alias, Model } from 'tsmodels';

import { Meta } from '../../../lib/models/meta.model';

import { Book } from './book.model';


export class BookResponse extends Model {

  @Alias() public books: Book[];
  @Alias() public meta: Meta;

}
