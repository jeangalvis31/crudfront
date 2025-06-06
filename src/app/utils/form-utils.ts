import { FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
    static phonePatter = '^[0-9]{7,15}$';
    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';

    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        return (
            !!form.controls[fieldName].errors && form.controls[fieldName].touched
        );
    }

    static getTextErrors(errors: ValidationErrors) {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Minimo de ${errors['minlength'].requiredLength} caracteres`;
                case 'min':
                    return `valor minimo de ${errors['min'].min}`;
                case 'noStrider':
                    return `no se puede usar el username strider`
                case 'emailTaken':
                    return `El correo electrónico ya esta en uso`
                case 'pattern':
                    if (errors['pattern'].requiredPattern == FormUtils.emailPattern) {
                        return 'Correo electrónico no permitido';
                    } else if (errors['pattern'].requiredPattern == FormUtils.notOnlySpacesPattern) {
                        return 'Nombre de usuario invalido.'
                    }
                    return 'Error de patron regex';
                case 'email':
                    return `El valor ingresado no es un correo electrónico`;
                default:
                    return `Error de validación no controlado`;

            }
        }
        return null
    }


    static getFieldError(form: FormGroup, fieldName: string): string | null {
        if (!form.controls[fieldName]) return null;

        const errors = form.controls[fieldName].errors ?? {}
        return this.getTextErrors(errors);
    }

}