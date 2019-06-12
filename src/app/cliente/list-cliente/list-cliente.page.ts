import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.page.html',
  styleUrls: ['./list-cliente.page.scss'],
})
export class ListClientePage implements OnInit {

  private clientes$: Observable<any[]>;

  constructor(
    private clienteService: ClienteService,
    private alertController: AlertController,
    private router:Router
  ) { }

  ngOnInit() {
    this.clientes$ = this.clienteService.getAll();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    this.clientes$ = this.clienteService.getAll();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async remove(key) {
    //   this.presentAlertConfirm(key);
    // }

    // async presentAlertConfirm(key) {
    const alert = await this.alertController.create({
      header: 'Confirme!',
      message: 'Deseja apagar o registro?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.clienteService.remove(key);
          }
        }
      ]
    });

    await alert.present();
  }

  edit(key){
    this.router.navigate(['/tabs/addCliente', key]);
  }

}
