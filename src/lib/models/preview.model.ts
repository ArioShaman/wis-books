import { Alias, Model } from 'tsmodels';

export class Preview extends Model {

  @Alias() public id: number;
  @Alias() public image: string;
  @Alias() public file: string;

}
