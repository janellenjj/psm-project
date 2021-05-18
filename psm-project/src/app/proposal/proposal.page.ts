import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ProposalModalPage } from '../proposal-modal/proposal-modal.page';
import { UserServiceService } from '../user-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-proposal',
	templateUrl: './proposal.page.html',
	styleUrls: ['./proposal.page.scss'],
})
export class ProposalPage implements OnInit {

	proposalTitle:any
	proposalType:any
	proposalStatus:any

	proposalList:any = []

	constructor(private afs:AngularFirestore, private modalController:ModalController, private userService:UserServiceService, public router:Router) { }

	async addProposal(){

		const modal = await this.modalController.create({
			component: ProposalModalPage,
			cssClass: 'my-custom-class',
			componentProps:{
				operation:'create'
			}
		});
		return await modal.present();

	}

	ngOnInit() {

		this.afs.collection('proposal', ref => ref.where('student','==',this.userService.user.userId)).valueChanges({idField:'proposalId'}).subscribe( (value:any) => {
			this.proposalList=value;
		})

		

		
	}

	

	async editProposal(_proposal){

		const modal = await this.modalController.create({
			component: ProposalModalPage,
			cssClass: 'my-custom-class',
			componentProps:{
				operation:'update',
				proposal:_proposal
			}
		});

		return await modal.present();
	}

	async deleteProposal(__proposal){

		if(confirm("Delete?")){

			this.afs.doc('proposal/' + __proposal.proposalId ).delete().then( () => {
				alert('done')
			})
			
		}

	}

	viewProposal(){
      this.router.navigateByUrl(`/comment?proposalId=${this.proposalList[0].proposalId}`)
    }

}
