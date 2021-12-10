import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})
export class Tab1Page {
  title = 'BMI stats';
  items = [ ];

  constructor(public toastController: ToastController, public alertController: AlertController) {}

  //Add function
  async addItem( data ){
    //weight (lb) / [height (in)]2 x 703
    const height= (Number(data.feet)*12) + Number(data.inches)
    console.log(height)

    data.bmi = (data.weight *703) / Math.pow(height ,2)
    data.date = Date.now()

    const toast = await this.toastController.create({
      message: `Adding Data..`,
      duration: 2000
    });
    toast.present();
    this.items.push(data)
    console.log(data)
  }
  //Delete function
  async removeItem(item,index){
    const toast = await this.toastController.create({
      message: `Removing item: ${item.name}`,
      duration: 2000
    });
    this.items.splice(index,1);
    toast.present();
  };

  //Update function
  async editItem(item,index){
    const toast = await this.toastController.create({
      message: `Editing item: ${item.name}`,
      duration: 2000
    });
    this.editAlertPrompt(item,index);
    toast.present();
  };
 

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Enter Height and Weight',
      inputs: [
        {
          name: 'weight',
          type: 'number',
          placeholder: 'Weight'
        },
        {
          name: 'feet',
          type: 'number',
          id: 'feet',
          placeholder: 'Feet'
        },
        {
          name: 'inches',
          type: 'number',
          id: 'inches',
          placeholder: 'Inches'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data=> {
            console.log('Confirm Cancel',data);
          }
        }, {
          text: 'save',
          handler: data => {
            this.addItem(data);
          }
        }
      ]
    });

    await alert.present();
  }



  async editAlertPrompt(item,index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Your Item',
      inputs: [
        {
          name: 'weight',
          placeholder: 'weight',
          value: item.weight
        },
        {
          name: 'feet',
          placeholder: 'feet',
          value:item.feet
        },
        {
          name: 'inches',
          placeholder: '',
          value:item.inches
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data=> {
            console.log('Confirm Cancel',item.name);
          }
        }, {
          text: 'save',
          handler: item=> {
            console.log('Confirm Ok',item);
            this.items[index] = item;
          }
        }
      ]
    });

    await alert.present();
  }
};

