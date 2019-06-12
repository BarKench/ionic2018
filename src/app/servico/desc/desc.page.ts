import { Component, OnInit } from '@angular/core';
import { Servico } from '../servico';
import { ServicoService } from '../servico.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-desc',
  templateUrl: './desc.page.html',
  styleUrls: ['./desc.page.scss'],
})
export class DescPage implements OnInit {
  private servico: Servico;
  constructor(
    private servicoService: ServicoService,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.servico = new Servico;
    this.servico.fotos ="assets/servico.jpg";
    this.servicoService.get(this.activeRouter.snapshot.paramMap.get("id")).subscribe(
      res => {
      this.servico = res;
      if (!this.servico.fotos){
        this.servico.fotos = "/assets/servico.jpg"
      }
    },
    err => {
      console.log(err);
    }
    )
  }

}
