import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserServiceService } from '../user-service.service';

@Component({
	selector: 'app-proposal-modal',
	templateUrl: './proposal-modal.page.html',
	styleUrls: ['./proposal-modal.page.scss'],
})

export class ProposalModalPage implements OnInit {

	proposalTitle:any
	proposalType:any
	proposalForm:any
	proposalStatus:any

	@Input() operation:any
	@Input() proposal:any

	constructor( 
		private afs:AngularFirestore,
		private modalController:ModalController,
		private storage:AngularFireStorage,
		private userService:UserServiceService
		) { }

	ngOnInit() {

		switch (this.operation) {

			case "update":
			this.proposalTitle = this.proposal.title
			this.proposalType = this.proposal.type
			this.proposalStatus = this.proposal.status
			this.proposalForm = this.proposal.formURL
			break;

			default:
			break;
		}

	}

	submit(){

		switch (this.operation) {

			case "create":

			let fileName = 'proposal/' + this.proposalForm.name

			this.storage.upload(fileName,this.proposalForm).then( ()=>{
				const ref = this.storage.ref(fileName);
				const downloadURL = ref.getDownloadURL().subscribe(url => {
					this.afs.collection('proposal').add({
						title:this.proposalTitle,
						type:this.proposalType,
						status:'submitted',
						formURL: url,
						student: this.userService.user.userId
					}).then( () => {
						alert("Successfully added!")
						this.modalController.dismiss();
					})
				});   
			})

			
			break;

			case "update":
			this.afs.doc('proposal/' + this.proposal.proposalId).update({
				title:this.proposalTitle,
				type:this.proposalType,
				status:this.proposalStatus
			}).then( () => {
				alert("Successfully updated!")
				this.modalController.dismiss();
			})
			break;
		}

	}

	fileSelected(ev){
		this.proposalForm = ev.target.files[0]
	}

}
