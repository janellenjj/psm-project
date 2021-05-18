import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { LecturerModalPage } from '../lecturer-modal/lecturer-modal.page';
import { combineLatest } from 'rxjs';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.page.html',
  styleUrls: ['./lecturer.page.scss'],
})

export class LecturerPage implements OnInit {

	lecturerName:any
	lecturerUsername:any
	lecturerPassword:any
	lecturerFaculty:any
	lecturerProgram:any
	lecturerDomain:any
	lecturerCommittee:any

	lecturerList:any = []

  programList:any
  programFilter:any = 'all'
  committeeFilter:any = 'all'

constructor(private afs:AngularFirestore, private modalController:ModalController, public userService:UserServiceService) { }

  async addLecturer(){

    const modal = await this.modalController.create({
      component: LecturerModalPage,
      cssClass: 'my-custom-class',
      componentProps:{
        operation:'create'
      }
    });
    return await modal.present();

  }

  ngOnInit() {

    console.log('auto run');

    let lectSub = this.afs.collection('lecturer').valueChanges({idField:'lecturerId'})
    let programSub = this.afs.collection('program').valueChanges({idField:'programId'})

    combineLatest(lectSub,programSub).subscribe( ([lectValue,programValue]:any) => {

      this.lecturerList = [];

      lectValue.forEach( _lect => {
        let lect = {..._lect};
        lect.program = {...programValue.find(_p => _p.programId == _lect.program)};
        this.lecturerList.push(lect)
      })

      this.programList = [...programValue];

    })
  }
  
  async editLecturer(_lecturer){

    const modal = await this.modalController.create({
      component: LecturerModalPage,
      cssClass: 'my-custom-class',
      componentProps:{
        operation:'update',
        lecturer:_lecturer
      }
    });

    return await modal.present();
  }

  async deleteLecturer(__lecturer){

    if(confirm("Are you confirm to delete?")){

      this.afs.doc('lecturer/' + __lecturer.lecturerId ).delete().then( () => {
        alert('Successfully deleted!')
      })
      
    }

  }
}
