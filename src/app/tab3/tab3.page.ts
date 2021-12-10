import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  constructor(public alertController: AlertController) {}


  async contactAlert() {
      const alert = await this.alertController.create({
        header: 'Your Message Has been sent.',
        subHeader: 'We shall respond to you shortly!',
        message: 'Thank you for contacting us!',
        buttons: ['submit']
      });
      await alert.present();
  };

}
