import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { StudentModalPage } from '../student-modal/student-modal.page';
import { combineLatest } from 'rxjs';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  studentName:any
  studentUsername:any
  studentPassword:any
  studentMatrics:any
  studentSession:any
  studentSem:any
  studentProgram:any
  studentSupervisor: any
  studentEvaluator1: any
  studentEvaluator2: any

  studentList:any = []
  sessionList:any
  semesterFilter:any = 'all'
  sessionFilter:any = 'all'

  constructor(private afs:AngularFirestore, private modalController:ModalController,public userService:UserServiceService) { }

  async addStudent(){

    const modal = await this.modalController.create({
      component: StudentModalPage,
      cssClass: 'my-custom-class',
      componentProps:{
        operation:'create'
      }
    });
    return await modal.present();

  }

  ngOnInit() {

    if(this.userService.user.committee){
      let stuSub = this.afs.collection('student').valueChanges({idField:'studentId'})
      let programSub = this.afs.collection('program').valueChanges({idField:'programId'})
      let lectSub = this.afs.collection('lecturer').valueChanges({idField:'lecturerId'})

      combineLatest(stuSub,programSub,lectSub).subscribe( ([stuValue,programValue,lectValue]:any) => {

        this.studentList = [];

        stuValue.forEach( _stu => {
          let stu = {..._stu};
          stu.program = {...programValue.find(_p => _p.programId == _stu.program)};
          if(_stu.supervisor){
            stu.supervisor.lect = {...lectValue.find(_l => _l.lecturerId == _stu.supervisor.lect_id)}  
          }

          if(_stu.evaluator1){
            stu.evaluator1 = {...lectValue.find(_l => _l.lecturerId == _stu.evaluator1)}
          }

          if(_stu.evaluator2){
            stu.evaluator2 = {...lectValue.find(_l => _l.lecturerId == _stu.evaluator2)}
          }
          
          
          
          this.studentList.push(stu)

          let sessionMap = new Map();
          stuValue.forEach(_stu => {
            if(!sessionMap.has(_stu.session)){
              sessionMap.set(_stu.session,_stu.session)
            }
          })

          this.sessionList = []

          sessionMap.forEach((key,val) => {
            this.sessionList.push(val)
          })
        })        
      })
    }else{

      let svSub = this.afs.collection('student', ref => ref.where('supervisor.lect_id','==',this.userService.user.userId)).valueChanges({idField:'studentId'});
      let ev1Sub = this.afs.collection('student', ref => ref.where('evaluator1','==',this.userService.user.userId)).valueChanges({idField:'studentId'});
      let ev2Sub = this.afs.collection('student', ref => ref.where('evaluator2','==',this.userService.user.userId)).valueChanges({idField:'studentId'});

      combineLatest(svSub,ev1Sub,ev2Sub).subscribe( ([svData,ev1Data,ev2Data]:any) => {
        let studentMap = new Map();

        svData.forEach( _student => {
          if(!studentMap.has(_student.studentId)){
            studentMap.set(_student.studentId,_student)
          }
        })

        ev1Data.forEach( _student => {
          if(!studentMap.has(_student.studentId)){
            studentMap.set(_student.studentId,_student)
          }
        })

        ev2Data.forEach( _student => {
          if(!studentMap.has(_student.studentId)){
            studentMap.set(_student.studentId,_student)
          }
        })

        let stuValue = []
        studentMap.forEach( (val,key) => {
          stuValue.push({...val})
        })

        let programSub = this.afs.collection('program').valueChanges({idField:'programId'})
        let lectSub = this.afs.collection('lecturer').valueChanges({idField:'lecturerId'})

        combineLatest(programSub,lectSub).subscribe( ([programValue,lectValue]:any) => {

          this.studentList = [];

          stuValue.forEach( _stu => {
            let stu = {..._stu};
            stu.program = {...programValue.find(_p => _p.programId == _stu.program)};
            if(_stu.supervisor){
              stu.supervisor.lect = {...lectValue.find(_l => _l.lecturerId == _stu.supervisor.lect_id)}  
            }

            if(_stu.evaluator1){
              stu.evaluator1 = {...lectValue.find(_l => _l.lecturerId == _stu.evaluator1)}
            }

            if(_stu.evaluator2){
              stu.evaluator2 = {...lectValue.find(_l => _l.lecturerId == _stu.evaluator2)}
            }            
          
            
            this.studentList.push(stu)

            let sessionMap = new Map();
            stuValue.forEach(_stu => {
              if(!sessionMap.has(_stu.session)){
                sessionMap.set(_stu.session,_stu.session)
              }
            })

            this.sessionList = []

            sessionMap.forEach((key,val) => {
              this.sessionList.push(val)
            })

          })          

        })
      })     
      
    }
    
  }

  // ionViewDidEnter(){  //no matter what will first show this
    // 	console.log('auto run');

    // 	let stuSub = this.afs.collection('student').valueChanges({idField:'studentId'})
    // 	let programSub = this.afs.collection('program').valueChanges({idField:'programId'})
    //   let lectSub = this.afs.collection('lecturer').valueChanges({idField:'lecturerId'})

    // 	combineLatest(stuSub,programSub,lectSub).subscribe( ([stuValue,programValue,lectValue]:any) => {

      // 		this.studentList = [];

      // 		stuValue.forEach( _stu => {
        // 			let stu = {..._stu};
        // 			stu.program = {...programValue.find(_p => _p.programId == _stu.program)};
        //       stu.supervisor.lect = {...lectValue.find(_l => _l.lecturerId == _stu.supervisor.lect_id)}
        //       stu.evaluator1 = {...lectValue.find(_l => _l.lecturerId == _stu.evaluator1)}
        //       stu.evaluator2 = {...lectValue.find(_l => _l.lecturerId == _stu.evaluator2)}
        // 			this.studentList.push(stu)
        // 		})

        

        // 	})

        // }

        async editStudent(_student){

          const modal = await this.modalController.create({
            component: StudentModalPage,
            cssClass: 'my-custom-class',
            componentProps:{
              operation:'update',
              student:_student
            }
          });

          return await modal.present();
        }

        async deleteStudent(__student){

          if(confirm("Are you confirm to delete?")){

            this.afs.doc('student/' + __student.studentId ).delete().then( () => {
              alert('Successfully deleted!')
            })
            
          }

        }

      }
