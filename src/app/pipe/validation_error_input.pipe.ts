import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const ERROR_MESSAGES: Record<string, string> = {
  required: 'Este campo es obligatorio',
  email: 'Formato de correo electrónico no válido',
  minlength: 'Este campo debe tener al menos 3 caracteres',
  maxlength: 'Este campo debe tener menos de 20 caracteres',
  unknown: 'Este campo tiene un error',
};

@Pipe({
  standalone: true,
  name: 'validationErrorInputPipe',
})
export class ValidationErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null | undefined) {
    if (errors) {
      const response = Object.entries(errors)
        .map(([key, value]) => {
          if (typeof value === 'string' && value.length > 0) {
            return value;
          } else if (value === true && ERROR_MESSAGES[key]) {
            return ERROR_MESSAGES[key];
          }
          if (typeof value === 'object' && ERROR_MESSAGES[key]) {
            return ERROR_MESSAGES[key];
          } else {
            return ERROR_MESSAGES['unknown'];
          }
        })
        .join('. ');
      return response;
    }
    return '';
  }
}
