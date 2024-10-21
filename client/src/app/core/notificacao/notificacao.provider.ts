import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NotificacaoService } from './notificacao.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

export const provideNotifications = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 4000,
        verticalPosition: 'bottom',
      },
    },

    NotificacaoService,
  ]);
};
