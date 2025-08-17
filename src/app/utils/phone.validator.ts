// phone.validator.ts
import { AbstractControl, ValidatorFn } from "@angular/forms";

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regex = /^\+\d{1,3}-\d{8,11}$/; // +CC-PhoneNumber
    const isValid = regex.test(control.value);
    return isValid ? null : { invalidPhone: true };
  };
}
