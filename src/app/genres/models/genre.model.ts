import { Alias, Model } from 'tsmodels';

export class Genre extends Model {

  @Alias() public id: number;
  @Alias() public name: string;

}
