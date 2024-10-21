import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AuthService } from "./service/auth.service";
import { UsuarioService } from "./service/usuario.service";
import { LocalStorageService } from "./service/local-storage.service";

export const provideAuthentication = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    AuthService,
    UsuarioService,
    LocalStorageService
  ])
}
