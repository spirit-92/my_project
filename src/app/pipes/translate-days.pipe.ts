import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateDays'
})
export class TranslateDaysPipe implements PipeTransform {

  transform(value: string){
    if(value ==='Monday'){
      return 'Понедельник'
    }
    else if (value ==='Tuesday'){
      return 'Вторник'
    }
    else if (value ==='Wednesday'){
      return 'Среда'
    }
    else if (value ==='Thursday'){
      return 'Четверг'
    }
    else if (value ==='Friday'){
      return 'Пятница'
    }
    else if (value ==='Saturday'){
      return 'Суббота'
    }
    else if (value ==='Sunday'){
      return 'Воскресенье'
    }
    else {
      return 'день недели не найден'
    }
  }
}
