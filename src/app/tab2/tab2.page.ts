
import { NgChartsModule } from 'ng2-charts';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
  
})


export class Tab2Page {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  dummydata = [65, 59 , 80 , 81, 56 , 55 , 40]
  dummylabels =  ['January', 'February' ,'March' , 'April', 'May' , 'June' , 'July']
  
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }

  title = 'BMI stats';
  items = [ ];

  constructor(public toastController: ToastController, public alertController: AlertController) {}

  //Add function
  async addItem( data ){

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
 

  async AlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Enter Height and Weight',
      inputs: [
        {
          name: 'weight',
          type: 'number',
          placeholder: 'Weight'
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
          name: 'date',
          placeholder: 'date',
          value: item.date
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
}