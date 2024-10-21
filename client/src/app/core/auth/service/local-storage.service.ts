import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/auth.models";

@Injectable()
export class LocalStorageService {
  private readonly chave: string = 'eAgenda.token';

  public salvarTokenAutenticacao(token: TokenViewModel): void {
    const jsonString = JSON.stringify(token);
    localStorage.setItem(this.chave, jsonString)
  }

  public obterTokenAutenticacao(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.chave);

    if (!jsonString) return undefined;
    return JSON.parse(jsonString);
  }

  public limparDadosLocais(): void {
    localStorage.removeItem(this.chave);
  }
}
