import { AbstractControl } from "@angular/forms";

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const pass = control.get('newPassword');
    const confirmPass = control.get('confirmPassword');
    if (pass.pristine || confirmPass.pristine) {
        return null;
    }
    return pass && confirmPass && pass.value !== confirmPass.value ? { 'misMatch': true } : null;
}
