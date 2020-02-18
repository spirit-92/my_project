import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mySlice'
})
export class MySlicePipe implements PipeTransform {

  transform(value: string[]): any {
    if (value != undefined &&value.length >7 ){
      let postSlice =  value.slice(0,7);
      return postSlice;
    }
    return value
  }

}
