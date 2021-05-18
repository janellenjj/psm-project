import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ProgramModalPage } from '../program-modal/program-modal.page';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {

	programCode:any
	programName:any
	programCoordinator:any

	programList:any = []

constructor(private afs:AngularFirestore, private modalController:ModalController) { }

  async addProgram(){

    const modal = await this.modalController.create({
      component: ProgramModalPage,
      cssClass: 'my-custom-class',
      componentProps:{
        operation:'create'
      }
    });
    return await modal.present();

  }

  ngOnInit() {

    console.log('auto run');

    this.afs.collection('program').valueChanges({idField:'programId'}).subscribe( (value:any) => {
      this.programList=value;
    })
  }
  
  async editProgram(_program){

    const modal = await this.modalController.create({
      component: ProgramModalPage,
      cssClass: 'my-custom-class',
      componentProps:{
        operation:'update',
        program:_program
      }
    });

    return await modal.present();
  }

    async deleteProgram(__program){

      if(confirm("Are you confirm to delete?")){

        this.afs.doc('program/' + __program.programId ).delete().then( () => {
          alert('Successfully deleted!')
        })
      
      }

  }

}
