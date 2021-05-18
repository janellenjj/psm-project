import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ProposalPage } from '../proposal/proposal.page';
import { UserServiceService } from '../user-service.service';
import { combineLatest } from 'rxjs';
import { ProposalModalPage } from '../proposal-modal/proposal-modal.page';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.page.html',
  styleUrls: ['./proposal-list.page.scss'],
})
export class ProposalListPage implements OnInit {

	proposalTitle:any
	proposalType:any
	proposalStatus:any
	proposalForm:any
	proposalList:any

  sessionList:any
  semesterFilter:any = 'all'
  sessionFilter:any = 'all'

  constructor(public userService:UserServiceService, private afs:AngularFirestore, private modalController:ModalController, public router:Router) {
    // code...
  }

  ngOnInit() {
    console.log(0,this.userService.user);
    this.userService.updateUser()

    let proposalPromise = new Promise( (resolve) => {
      switch (this.userService.user.committee) {
        case true:

        let propSub = this.afs.collection('proposal').valueChanges({idField:'proposalId'});
        let studentSub = this.afs.collection('student').valueChanges({idField:'studentId'});

        combineLatest(propSub,studentSub).subscribe(([propValue,studentValue]:any) => {

          this.proposalList = [];
          propValue.forEach( _prop => {
            _prop.student = studentValue.find( _s => _s.studentId == _prop.student)
            this.proposalList.push(_prop);
          })

          let sessionMap = new Map();
          studentValue.forEach(_stu => {
            if(!sessionMap.has(_stu.session)){
              sessionMap.set(_stu.session,_stu.session)
            }
          })

          this.sessionList = []

          sessionMap.forEach((key,val) => {
            this.sessionList.push(val)
          })
          

        })

        resolve(true)

        break;

        case false:


        let svSub = this.afs.collection('student', ref => ref.where('supervisor.lect_id','==',this.userService.user.userId)).valueChanges({idField:'studentId'});
        let ev1Sub = this.afs.collection('student', ref => ref.where('evaluator1','==',this.userService.user.userId)).valueChanges({idField:'studentId'});
        let ev2Sub = this.afs.collection('student', ref => ref.where('evaluator2','==',this.userService.user.userId)).valueChanges({idField:'studentId'});

        // let studentSub2 = this.afs.collection('student').valueChanges({idField:'studentId'});
        combineLatest(svSub,ev1Sub,ev2Sub).subscribe( ([svData,ev1Data,ev2Data]:any) => {

          let proposalMap = new Map();
          let sessionMap = new Map();
          let studentMap = new Map();

          svData.forEach( _student => {
            if(!studentMap.has(_student.studentId)){
              studentMap.set(_student.studentId,_student)
            }

            if(!sessionMap.has(_student.session)){
              sessionMap.set(_student.session,_student.session)
            }
          })

          ev1Data.forEach( _student => {
            if(!studentMap.has(_student.studentId)){
              studentMap.set(_student.studentId,_student)
            }

            if(!sessionMap.has(_student.session)){
              sessionMap.set(_student.session,_student.session)
            }
          })

          ev2Data.forEach( _student => {
            if(!studentMap.has(_student.studentId)){
              studentMap.set(_student.studentId,_student)
            }

            if(!sessionMap.has(_student.session)){
              sessionMap.set(_student.session,_student.session)
            }
          })



          ev2Data.forEach( _student => {
            if(!proposalMap.has(_student.proposal)){

            }

            if(!sessionMap.has(_student.session)){
              sessionMap.set(_student.session,_student.session)
            }

          })

          this.proposalList = [];

          studentMap.forEach((val,key) => {
            this.afs.collection('proposal', ref => ref.where('student','==',val.studentId)).valueChanges({idField:'proposalId'}).subscribe( (_proposal:any) => {

              if(_proposal[0]){
                let _proposalObject = {..._proposal[0]};
                _proposalObject.student = {...val};
                this.proposalList.push({..._proposalObject})   
              }
              ;
            })

          })

          this.sessionList = []

          sessionMap.forEach((val,key) => {
            this.sessionList.push(val)
          })

          resolve(true)

        })


        break;
        
        default:
        break;
      }
    })

    proposalPromise.then( () => {
      let programSub = this.afs.collection('program').valueChanges({idField:'programId'})
      let lectSub = this.afs.collection('lecturer').valueChanges({idField:'lecturerId'})

      combineLatest(programSub,lectSub).subscribe( ([programValue,lectValue]:any) => {

        this.proposalList.forEach( _proposal => {

          

          _proposal.student.program = {...programValue.find(_p => _p.programId == _proposal.student.program)};

          for(let lect of lectValue){

            if(lect.lecturerId === _proposal.student.supervisor.lect_id){
              _proposal.student.supervisor.lect = {...lect}
            }

            if(lect.lecturerId === _proposal.student.evaluator1){
              _proposal.student.evaluator1 = {...lect}
            }

            if(lect.lecturerId === _proposal.student.evaluator2){
              _proposal.student.evaluator2 = {...lect}
            }

          }

          console.log('WTF BRO?',_proposal.student)
          
        })



      })
    })

  }

  ionViewDidEnter(){

  }

  async editProposal(_proposal){

    console.log(_proposal);

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

    if(confirm("Are you confirm to delete?")){

      this.afs.doc('proposal/' + __proposal.proposalId ).delete().then( () => {
        alert('Successfully deleted!')
      })
      
    }

  }

  viewProposal(_proposal){
    console.log(_proposal);
    this.router.navigateByUrl(`/comment?proposalId=${_proposal.proposalId}`)

  }



}
