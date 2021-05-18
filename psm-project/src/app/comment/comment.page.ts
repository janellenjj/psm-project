import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { UserServiceService } from '../user-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

	supervisorComment:any
	evaluator1Comment:any
	evaluator2Comment:any

	commentInput:any
	proposal:any
	proposalId:any

	userMap:any
  evResult:any

  constructor(private afs:AngularFirestore,private route: ActivatedRoute, public userService:UserServiceService) { }

  // ngOnInit(){}

  ngOnInit() {
  	this.route.queryParams.subscribe(params => {

  		this.proposalId = params.proposalId;
  		let propSub = this.afs.doc('proposal/' + params.proposalId).valueChanges()
  		let studentSub = this.afs.collection('student').valueChanges({idField:'studentId'})
  		let commentSub = this.afs.collection('proposal/' + params.proposalId + '/comment', ref => ref.orderBy('timestamp')).valueChanges({idField:'commentId'})

  		combineLatest(propSub,studentSub,commentSub).subscribe(([_proposal,_student,_comment]:any) => {
  			this.proposal = {..._proposal};
        let _stuBuffer =  _student.find( _s => _s.studentId == _proposal.student);
  			this.proposal.student = {..._stuBuffer};

  			let svSub = this.afs.doc(`lecturer/${this.proposal.student.supervisor.lect_id}`).valueChanges({idField:'lecturerId'})

        let ev1Sub;
        if(this.proposal.student.evaluator1){
          ev1Sub = this.afs.doc(`lecturer/${this.proposal.student.evaluator1}`).valueChanges({idField:'lecturerId'})
        }else{
          ev1Sub = new Promise( resolve => resolve(false))
        }

        let ev2Sub;
        if(this.proposal.student.evaluator1){
          ev2Sub = this.afs.doc(`lecturer/${this.proposal.student.evaluator2}`).valueChanges({idField:'lecturerId'})
        }else{
          ev2Sub = new Promise( resolve => resolve(false))
        }
  			 
  			// let ev2Sub = this.afs.doc(`lecturer/${this.proposal.student.evaluator2}`).valueChanges()

  			combineLatest(svSub,ev1Sub,ev2Sub).subscribe(([svDoc,ev1Doc,ev2Doc]:any) => {
  				this.proposal.student.supervisor.lect = svDoc;
          if(ev1Doc){
            this.proposal.student.evaluator1 = {
            lect_id: ev1Doc.lecturerId,
            lect : ev1Doc
          }  
          }else{
            this.proposal.student.evaluator1 = {
            lect_id: '',
          }
          }

          if(ev2Doc){
            this.proposal.student.evaluator2 = {
            lect_id: ev2Doc.lecturerId,
            lect : ev2Doc
          }  
          }else{
            this.proposal.student.evaluator2 = {
            lect_id: '',
          }
          }

  				if(!this.userMap){
  					this.userMap = new Map();
  				}

  				this.userMap.set(this.proposal.student.supervisor.lect_id,{role:'supervisor',...svDoc})
  				this.userMap.set(this.proposal.student.evaluator1.lect_id,{role:'evaluator',...ev1Doc})
  				this.userMap.set(this.proposal.student.evaluator2.lect_id,{role:'evaluator',...ev2Doc})

	  			this.proposal.comment = [..._comment];
	  			this.proposal.comment.forEach( _c => {
	  				_c.author = this.userMap.get(_c.author);
	  				_c.timestamp = moment(_c.timestamp.seconds * 1000).format('hh:mm A DD/MM')
	  			})

          console.clear()
          console.log(this.userService.user.userId,this.proposal.student)
  			})
  			


  		})


      }
    );
  }

  addComment(){

  	this.afs.collection(`proposal/${this.proposalId}/comment`).add({
  		author: this.userService.user.userId,
  		comment: this.commentInput,
  		timestamp: new Date(Date.now())
  	})

  }

  evaluateProposal(){
    if(confirm("Are you confirm?")){

        this.afs.doc(`proposal/${this.proposalId}`).update({
        status: this.evResult
        }).then(()=>{
          alert("Successfully updated!")
        })
          
        }     
      
      }
    
  }

