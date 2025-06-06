import { FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
    static phonePatter = '^[0-9]{7,15}$';
    static namePattern = '^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)+$';

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
                case 'pattern':
                    const pattern = errors['pattern'].requiredPattern;
                    switch (pattern) {
                        case FormUtils.emailPattern:
                            return 'Correo electrónico inválido';
                        case FormUtils.notOnlySpacesPattern:
                            return 'Texto inválido';
                        case FormUtils.phonePatter:
                            return 'Teléfono inválido (7-15 dígitos)';
                        case FormUtils.namePattern:
                            return 'Debe ingresar nombre y apellido';
                        default:
                            return 'Formato inválido';
                    }
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