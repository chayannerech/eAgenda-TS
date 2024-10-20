import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AuthService } from "./service/auth.service";
import { UsuarioService } from "./service/usuario.service";

export const provideAuthentication = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    AuthService,
    UsuarioService
  ])
}
