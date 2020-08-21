import { Alias, Model } from 'tsmodels';

export class IAuthor extends Model {

  @Alias() public id: number;
  @Alias('first_name') public firstName: string;
  @Alias('last_name') public lastName: string;

}
