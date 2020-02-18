import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateMonth'
})
export class TranslateMonthPipe implements PipeTransform {

  transform(value: string) {
    if (value === 'January') {
      return 'Январь'
    }
    else if (value === 'February') {
      return 'Февраль'
    }
    else if (value === 'March') {
      return 'Март'
    }
    else if (value === 'April') {
      return 'Апрель'
    }
    else if (value === 'May') {
      return 'Май'
    }
    else if (value === 'June') {
      return 'Июнь'
    }
    else if (value === 'July') {
      return 'Июль'
    }
    else if (value === 'August') {
      return 'Август'
    }
    else if (value === 'September') {
      return 'Сентябрь'
    }
    else if (value === 'October') {
      return 'Октябрь'
    }
    else if (value === 'November') {
      return 'Ноябрь'
    }
    else if (value === 'December') {
      return 'Декабрь'
    }
    else {
      return value;
    }

  }

}
