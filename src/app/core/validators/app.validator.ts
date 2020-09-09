import { ValidatorFn, FormGroup } from '@angular/forms';

export class AppValidator {

  constructor () { }

  public checkPasswordValidation: ValidatorFn =
  (control: FormGroup): null => {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');

    if (password.value !== passwordConfirmation.value) {
      passwordConfirmation.setErrors({ confirmationInvalid: true });
    }

    return null;
  }

  public checkDateValidation: ValidatorFn =
  (control: FormGroup): null => {
    const wDate = control.get('writingDate');
    const rDate = control.get('releaseDate');

    if (rDate.value < wDate.value) {
      rDate.setErrors({ invalidDate: true });
    }

    return null;
  }

  public checkImageValidation: ValidatorFn =
  (control: FormGroup): null => {
    const imageState = control.get('uploadedImage');

    if (!imageState.value) {
      imageState.setErrors({ imageError: true });
    }

    return null;
  }

}
