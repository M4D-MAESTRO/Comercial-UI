import { Component, OnInit } from '@angular/core';
import { OportunidadeService } from '../oportunidade.service';
import { OportunidadeDTO } from '../models/oportunidade.dto';
import { NewOportunidadeDTO } from '../models/newOportunidade.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {

  oportunidades: OportunidadeDTO[] = [];
  newOportunidade: NewOportunidadeDTO = {
    descricao: null,
    nomeProspecto: null,
    valor: null
  };


  constructor(private oportunidadeService: OportunidadeService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.oportunidadeService.getAll().subscribe(req => {
      this.oportunidades = <any>req;
    });
  }

  adicionar() {
    this.oportunidadeService.saveOne(this.newOportunidade)
      .subscribe(() => {
        this.newOportunidade = {
          descricao: null,
          nomeProspecto: null,
          valor: null
        };
        this.consultar();
        this.messageService.add({
          severity: 'success',
          summary: 'Oportunidade cadastrada com sucesso!'
        })
      },
        res => {
          let msg = "Erro inesperado. Tente novamente!"

          if (res.error.message) {
            msg = res.error.message;
          }

          this.messageService.add({
            severity: 'error',
            summary: msg
          })

        })
  }

}
