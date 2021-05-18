import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-program-modal',
	templateUrl: './program-modal.page.html',
	styleUrls: ['./program-modal.page.scss'],
})
export class ProgramModalPage implements OnInit {

	programCode:any
	programName:any
	programCoordinator:any

	@Input() operation:any
	@Input() program:any

	constructor( private afs:AngularFirestore, private modalController:ModalController) { }

	ngOnInit() {

		switch (this.operation) {

			case "update":
			this.programCode = this.program.code
			this.programName = this.program.name
			this.programCoordinator = this.program.coordinator
			break;

			default:
			break;
		}

	}

	submit(){

		switch (this.operation) {

			case "create":
				this.afs.collection('program').add({
					code:this.programCode,
					name:this.programName,
					coordinator:this.programCoordinator
				}).then( () => {
					alert("Successfully added!")
					this.modalController.dismiss();
				})
			break;

			case "update":			
				this.afs.doc('program/' + this.program.programId ).update({
					code:this.programCode,
					name:this.programName,
					coordinator:this.programCoordinator
				}).then( () => {
					alert("Successfully updated!")
					this.modalController.dismiss();
				})
			break;

			
		}



	}
}
