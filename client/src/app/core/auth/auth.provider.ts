import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AuthService } from "./service/auth.service";
import { UsuarioService } from "./service/usuario.service";
import { LocalStorageService } from "./service/local-storage.service";
import { AuthInterceptor } from "./service/auth.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

export const provideAuthentication = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    AuthService,
    UsuarioService,
    LocalStorageService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ])
}
