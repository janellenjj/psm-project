import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserServiceService } from '../user-service.service';
import { combineLatest } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.page.html',
  styleUrls: ['./lecturer-list.page.scss'],
})
export class LecturerListPage implements OnInit {

	lecturerList:any

  constructor(public userService:UserServiceService, private afs:AngularFirestore, private modalController:ModalController) { }

  ionViewDidEnter(){  //no matter what will first show this
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
  	})

  }

  ngOnInit() {
  }

  selectLecturer(lect){

  	this.afs.doc('student/' + this.userService.user.userId).update({
  		supervisor: {
  			lect_id:lect.lecturerId,
  			status: 'pending'
  		}
  	}).then( () => {
  		alert('request sent')
  		this.userService.updateUser();
  		this.modalController.dismiss();
  	})
  }
}
