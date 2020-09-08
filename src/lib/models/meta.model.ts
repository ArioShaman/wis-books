import { Alias, Model } from 'tsmodels';

export class Meta extends Model {

  @Alias() public pages: number;
  @Alias() public records: number;
  @Alias() public limit: number;
  @Alias() public page: number;

}
