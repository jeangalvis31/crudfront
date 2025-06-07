import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationsService } from '../services/notifications.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationsService);

  return next(req).pipe(
    catchError(err => {
      let msg = 'Error desconocido';
      if (err.status === 0) {
        msg = 'No se pudo conectar con el servidor.';
      } else if (err.status === 400) {
        msg = 'Solicitud incorrecta.';
      } else if (err.status === 404) {
        msg = 'Recurso no encontrado.';
      } else if (err.status >= 500) {
        msg = 'Error del servidor.';
      }

      notificationService.showMessage(msg);

      return throwError(() => err);
    })
  );
};
