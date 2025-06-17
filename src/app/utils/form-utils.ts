import { FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
    static phonePatter = '^[0-9]{7,15}$';
    static namePattern = '^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)+$';



    static errorMap: { [key: string]: any } = {
        required: 'Este campo es requerido',
        minlength: ({ requiredLength, actualLength }: any) =>
            `Mínimo ${requiredLength} caracteres (actual: ${actualLength})`,
        maxlength: ({ requiredLength, actualLength }: any) =>
            `Máximo ${requiredLength} caracteres (actual: ${actualLength})`,
        email: 'Correo electrónico inválido',
        pattern: {
            default: 'Formato inválido',
            [FormUtils.emailPattern]: 'Correo electrónico inválido',
            [FormUtils.notOnlySpacesPattern]: 'Texto inválido',
            [FormUtils.phonePatter]: 'Teléfono inválido (7-15 dígitos)',
            [FormUtils.namePattern]: 'Debe ingresar nombre y apellido',
        },
        unknown: 'Error de validación no controlado'
    };

    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        return !!form.controls[fieldName]?.errors && form.controls[fieldName].touched;
    }

    static getErrorMessages(errors: ValidationErrors): { [key: string]: string } {
        const messages: { [key: string]: string } = {};

        for (const key of Object.keys(errors)) {
            const errorValue = errors[key];

            if (typeof this.errorMap[key] === 'string') {
                messages[key] = this.errorMap[key] as string;
            } else if (key === 'pattern') {
                const pattern = errorValue.requiredPattern;
                messages[key] = this.errorMap["pattern"][pattern] || this.errorMap["pattern"].default;
            } else {
                messages[key] = this.errorMap["unknown"];
            }
        }

        return messages;
    }

    static getFirstErrorText(errors: ValidationErrors): string | null {
        const mensajes = this.getErrorMessages(errors);
        return Object.values(mensajes)[0] ?? null;
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        if (!form.controls[fieldName]) return null;
        const errors = form.controls[fieldName].errors ?? {};
        return this.getFirstErrorText(errors);
    }
}

