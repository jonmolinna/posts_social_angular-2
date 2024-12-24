import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

@Pipe({
  name: 'DateLocalePipe',
  standalone: true,
})
export class DateLocalePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return moment(value).format('l');
  }
}
