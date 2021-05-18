import { Component, OnInit, Input } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-lecturer-modal',
  templateUrl: './lecturer-modal.page.html',
  styleUrls: ['./lecturer-modal.page.scss'],
})
export class LecturerModalPage implements OnInit {

	lecturerName:any
	lecturerUsername:any
	lecturerPassword:any
	lecturerFaculty:any
	lecturerProgram:any
	lecturerDomain:any	
	lecturerCommittee:any

	allProgram:any


	@Input() operation:any
	@Input() lecturer:any

	constructor( private afs:AngularFirestore, private modalController:ModalController, public userService:UserServiceService) { }

	ngOnInit() {}

	ionViewDidEnter(){
		console.log(this.lecturer)

		let programSub = this.afs.collection('program').valueChanges({idField:'programId'}).subscribe( (value:any) => {
			if(value.length > 0){
		  		this.allProgram = [...value]
	  			programSub.unsubscribe();
	  			console.log(this.allProgram)
			}

	  	})

		switch (this.operation) {

			case "update":
			this.lecturerName = this.lecturer.name
			this.lecturerUsername = this.lecturer.username
			this.lecturerPassword = this.lecturer.password
			this.lecturerFaculty = this.lecturer.faculty
			this.lecturerProgram = this.lecturer.program.programId
			this.lecturerDomain = this.lecturer.domain
			this.lecturerCommittee = this.lecturer.committee
			break;

			default:
			break;
		}
	}

	submit(){

		switch (this.operation) {

			case "create":
				
				this.afs.collection('lecturer').add({
					name:this.lecturerName,
					username:this.lecturerUsername,
					password:this.lecturerPassword,
					faculty:this.lecturerFaculty,
					program:this.lecturerProgram,
					domain:this.lecturerDomain ? this.lecturerDomain : 'Not assigned',
					committee:this.lecturerCommittee ? this.lecturerCommittee : false
				}).then( () => {
					alert("Successfully added!")
					this.modalController.dismiss();
				})
			break;

			case "update":			
				this.afs.doc('lecturer/' + this.lecturer.lecturerId ).update({
					name:this.lecturerName,
					username:this.lecturerUsername,
					password:this.lecturerPassword,
					faculty:this.lecturerFaculty,
					program:this.lecturerProgram,
					domain:this.lecturerDomain ? this.lecturerDomain : 'Not assigned',
					committee:this.lecturerCommittee ? this.lecturerCommittee : false
				}).then( () => {
					alert("Successfully updated!")
					this.modalController.dismiss();
				})
			break;

			
		}



	}

}
