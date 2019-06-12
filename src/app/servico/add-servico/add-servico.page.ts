import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { Servico } from '../servico';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-add-servico',
  templateUrl: './add-servico.page.html',
  styleUrls: ['./add-servico.page.scss'],
})
export class AddServicoPage implements OnInit {

  private servico: Servico;
  private preview: any = null;
  private id = null;

  constructor(
    private servicoService: ServicoService,
    public alertController: AlertController,
    private router:Router,
    private camera: Camera,
    private sn: DomSanitizer,
    private androidPermissions: AndroidPermissions,
    public loadingController: LoadingController,
  ) { 
    //Verifica se Existe permissão no sistema
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA)
    .then(
      result => console.log('Possui permissão?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
  }

  ngOnInit() {
    this.servico = new Servico;
    
  }

  onSubmit(form) {
    this.servicoService.save(this.servico)
      .then(
        res => {
          this.presentAlert("Aviso", ". Já tá salvo!");
          console.log(this.servico);
          form.reset();
          this.servico = new Servico;
          this.router.navigate(['/tabs/tab3']);
        },
        err => {
          this.presentAlert("Erro!!!", "Ops!! Deu erro!" + err);
        }
      );
  }

  //Alertas ----------------------------------------------
  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }

  async tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = this.sn.bypassSecurityTrustResourceUrl(base64Image);
      //console.log(this.preview);      
    }, (err) => {
      // Handle error
      console.log("Erro camera:" + err);
    });
  }

}
