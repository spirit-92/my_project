import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degreeRounding'
})
export class DegreeRoundingPipe implements PipeTransform {

  transform(value: number) {
    return Math.round(value-272.6);
  }

}
