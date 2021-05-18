import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.page.html',
  styleUrls: ['./student-modal.page.scss'],
})
export class StudentModalPage implements OnInit {

 	studentName:any
	studentUsername:any
	studentPassword:any
	studentMatrics:any
	studentSession:any
	studentSem:any
	studentProgram:any
  	studentEvaluator1: any
  	studentEvaluator2: any

	allProgram:any
	allLecturer:any


	@Input() operation:any
	@Input() student:any
	@Input() role:any

	constructor( private afs:AngularFirestore, private modalController:ModalController, public userService:UserServiceService) { }

	ngOnInit(){}

	ionViewDidEnter(){

		console.log(0,this.student);

		let selectedLect = []

		switch (this.operation) {
			case "create":
			// code...
			break;

			case "update":

			if(this.student.supervisor){
				selectedLect.push(this.student.supervisor.lect_id)
			}


			this.studentName = this.student.name
			this.studentUsername = this.student.username
			this.studentPassword = this.student.password
			this.studentMatrics = this.student.matrics
			this.studentSession = this.student.session
			this.studentSem = this.student.sem

			if(typeof(this.student.program) == 'string'){
				this.studentProgram = this.student.program
			}else{
				this.studentProgram = this.student.program.programId
			}
			
			this.studentEvaluator1 = this.student.evaluator1.lecturerId
			this.studentEvaluator2 = this.student.evaluator2.lecturerId
			break;

			default:
			// code...
			break;
		}

		

		let programSub = this.afs.collection('program').valueChanges({idField:'programId'}).subscribe( (value:any) => {
			if(value.length > 0){
		  		this.allProgram = [...value]
	  			// programSub.unsubscribe();
	  			console.log(this.allProgram)
			}

	  	})

	  	if(this.student){
		  	let proposalSub = this.afs.collection('proposal', ref => ref.where('student','==',this.student.studentId)).valueChanges({idField:'proposalId'}).subscribe( (proposalData:any) => {
		  		
		  		console.clear()
		  		console.log(proposalData)

		  		if(proposalData[0]){
		  			proposalSub.unsubscribe();
			  		let lectSub = this.afs.collection('lecturer', ref => ref.where('domain','==', proposalData[0]['type'])).valueChanges({idField:'lecturerId'}).subscribe( (value:any) => {
						if(value.length > 0){
					  		this.allLecturer = []

					  		value.forEach( _lect => {
					  			if(!selectedLect.includes(_lect.lecturerId)){
					  				this.allLecturer.push(_lect)
					  			}
					  		})

				  			// lectSub.unsubscribe();
				  			console.log(this.allLecturer)
						}

				  	})

		  		}
		  	})

	  	}


	  	


	}

	submit(){

		switch (this.operation) {

			case "create":
				
				this.afs.collection('student').add({
					name:this.studentName,
					username:this.studentUsername,
					password:this.studentPassword,
					matrics:this.studentMatrics,
					session:this.studentSession,
					sem:this.studentSem,
					program:this.studentProgram,
					evaluator1:this.studentEvaluator1 ? this.studentEvaluator1 : '',
					evaluator2:this.studentEvaluator2 ? this.studentEvaluator2 : ''
				}).then( () => {
					alert("Successfully added!")
					this.modalController.dismiss();
				})
			break;

			case "update":

				let docId;

				if(this.student.studentId){
					docId = this.student.studentId
				}

				if(this.student.userId){
					docId = this.student.userId
				}

				this.afs.doc('student/' + docId ).update({
					name:this.studentName,
					username:this.studentUsername,
					password:this.studentPassword,
					matrics:this.studentMatrics,
					session:this.studentSession,
					sem:this.studentSem,
					program:this.studentProgram,
					evaluator1:this.studentEvaluator1 ? this.studentEvaluator1 : '',
					evaluator2:this.studentEvaluator2 ? this.studentEvaluator2 : ''
				}).then( () => {
					alert("Successfully updated!")
					this.modalController.dismiss();
					// this.userService.updateUser();
				})
			break;

			

			
		}



	}


}
