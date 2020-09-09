import { Alias, Model } from 'tsmodels';

export class SignUpForm extends Model {

  @Alias() public email: string;
  @Alias() public password: string;

  @Alias('password_confirmation') public passwordConfirmation: string;
  @Alias('first_name') public firstName: string;
  @Alias('last_name') public lastName: string;

}
