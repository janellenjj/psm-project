import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { ModalController } from '@ionic/angular';
import { StudentModalPage } from '../student-modal/student-modal.page';
import { LecturerListPage } from '../lecturer-list/lecturer-list.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})

export class StudentPage implements OnInit {

	userSv:any
  userProposal:any = {status:''}

	constructor(public userService:UserServiceService,private modalController:ModalController, private afs:AngularFirestore,public router:Router) {
	}
  
  ngOnInit() {

      console.log(this.userService.user.supervisor)

      this.afs.collection('student', ref => ref.where('username','==', this.userService.user.username)).valueChanges().subscribe( (data:any)=>{
        this.userService.updateUser();
        if(this.userService.user.supervisor){
          let lect = this.afs.doc('lecturer/' + this.userService.user.supervisor.lect_id).valueChanges();
      lect.subscribe( x =>{
        this.userSv = x
        console.log(this.userSv);
      })

      let propSub = this.afs.collection('proposal', ref => ref.where('student','==',this.userService.user.userId)).valueChanges({idField:'proposalId'}).subscribe( (data:any) => {
        if(data[0]){
          this.userProposal = data[0]
        }
      })
      
      }
      
    })
  
    }

  proposal(){
    this.router.navigate(['./proposal'])
  }
  async updateDetails(){
  	const modal = await this.modalController.create({
      component: StudentModalPage,
      cssClass: 'my-custom-class',
      componentProps:{
        operation:'update',
        role:'student',
        student:this.userService.user
      }
    });

    return await modal.present();
  }

  async chooseSupervisor(){
  	const modal = await this.modalController.create({
      component: LecturerListPage,
      cssClass: 'my-custom-class',
      componentProps:{
        operation:'choose',
        role:'student',
        student:this.userService.user
      }
    });

    return await modal.present();
  }

  }
