import { Component, Input, Output } from "@angular/core";
import { ItemTarefaViewModel } from "../../models/tarefa.models";
import { NgIf } from "@angular/common";
import { AbstractControl } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-listar-itens',
  standalone: true,
  imports: [ NgIf, MatIconModule],

  templateUrl: './listar-itens.component.html',
  styleUrl: '../../styles/tarefas.scss',
})

export class ListarItensComponent {
  @Input() item: ItemTarefaViewModel | undefined;
  @Input() itemEmExclusao: ItemTarefaViewModel | undefined;
  @Input() itemEmEdicao: ItemTarefaViewModel | undefined;
  @Input() tituloTarefa: AbstractControl<any, any> | null = null;
  @Input() editandoItem: boolean = false;
  @Input() excluindoItem: boolean = false;
  @Input() cadastrandoItem: boolean = false;
  @Input() itensTarefa: ItemTarefaViewModel[] = [];

  abrirEdicaoDeItem(id: number) {
    if (!id) return;

    this.itemEmEdicao = this.selecionarItemPorId(id);

    this.tituloTarefa?.setValue(this.itemEmEdicao!.tituloTarefa);
    this.editandoItem = true;
    this.cadastrandoItem = false;
  }

  excluirItem(id: number) {
    this.itensTarefa = this.itensTarefa.filter(item => item.id != id);
    this.excluindoItem = false;
  }

  private selecionarItemPorId(id: number) : ItemTarefaViewModel | undefined{
    for(let item of this.itensTarefa)
      if (item.id == id)
        return item;
    return;
  }
}
