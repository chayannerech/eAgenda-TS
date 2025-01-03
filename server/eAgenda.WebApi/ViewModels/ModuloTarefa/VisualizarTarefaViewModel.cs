﻿namespace eAgenda.WebApi.ViewModels.ModuloTarefa
{
    public class VisualizarTarefaViewModel
    {
        public VisualizarTarefaViewModel()
        {
            Itens = new List<ItemTarefaViewModel>();
        }

        public Guid Id { get; set; }

        public string Titulo { get; set; }

        public DateTime DataCriacao { get; set; }

        public DateTime? DataConclusao { get; set; }

        public int QuantidadeItens { get; set; }

        public decimal PercentualConcluido { get; set; }

        public string Prioridade { get; set; }

        public string Situacao { get; set; }

        public List<ItemTarefaViewModel> Itens { get; set; }
    }
}
