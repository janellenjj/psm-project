import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'lecturer'
})
export class LecturerPipe implements PipeTransform {

	transform(value: any, ...filters: any): any {

		let results = [];

		filters.forEach( _filter => {

			switch (_filter.field) {
				case "program":

					let resultProgram = [];

					if(_filter.target == 'all'){
						resultProgram = value;
					}else{
						

						value.forEach( _lect => {
							if(_lect.program.programId == _filter.target){
								resultProgram.push(_lect)
							}
						})

						
					}

					results.push(resultProgram)

				break;

				case "committee":

					let resultCommittee = [];

					if(_filter.target == 'all'){
						resultCommittee = value;
					}else{
						

						value.forEach( _lect => {
							if(_lect.committee == _filter.target){
								resultCommittee.push(_lect)
							}
						})

						
					}

					results.push(resultCommittee)

				break;

				default:
				// code...
				break;
			}


		})

		let combinedResult = results[0];

		if(results.length > 1){
			for(let i=0;i<results.length;i++){
				combinedResult = this.intersect(combinedResult,results[i]);
			}	
		}

		console.log(combinedResult);



		return combinedResult;
	}

	intersect(a, b) {
		var setA = new Set(a);
		var setB = new Set(b);
		var intersection = new Set([...setA].filter(x => setB.has(x)));
		return Array.from(intersection);
	}

}
