import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {

	svRequests:any

  constructor(private afs:AngularFirestore) { }

  ngOnInit() {

    let studentSub = this.afs.collection('student').valueChanges({idField:'userId'})
    let lectSub = this.afs.collection('lecturer').valueChanges({idField:'userId'})
    let programSub = this.afs.collection('program').valueChanges({idField:'programId'})

    combineLatest(studentSub,lectSub,programSub).subscribe( ([studentValue,lectValue,programValue]) => {

      this.svRequests = [];

      studentValue.forEach( (_student:any) => {
        if(_student.supervisor){
          if(_student.supervisor.status == 'pending'){
            
            let _stu = {..._student};
            let _lect:any = lectValue.find(_l => _l.userId == _stu.supervisor.lect_id);

            _stu.program = programValue.find(_p => _p.programId == _stu.program);
            _lect.program = programValue.find(_p => _p.programId == _lect.program);

            console.log(_stu,_lect);

            this.svRequests.push({
              student:_stu,
              lecturer:_lect
            })

          }
          
        }
      })

    })
  }

  approveSupervisor(svRequests){
  	console.log(svRequests)
  	
    if(confirm("Confirm approve?")){
      this.afs.doc('student/' + svRequests.student.userId).update({
      supervisor: {
        lect_id:svRequests.lecturer.userId,
        status: 'accept'
      }
    }).then( () => {
      alert('Successfully approved!')
    })
    }


  }




  rejectSupervisor(svRequests){

    if(confirm("Confirm reject?")){
        this.afs.doc('student/' + svRequests.student.userId).update({
      supervisor: {
        lect_id:svRequests.lecturer.userId,
        status: 'reject'
      }
    }).then( () => {
      alert('Successfully rejected!')
    })
    }
  
  }

}
