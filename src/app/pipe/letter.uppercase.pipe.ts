import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'LetterUppercasePipe',
  standalone: true,
})
export class LetterUppercasePipe implements PipeTransform {
  transform(value: string | any, ...args: any[]): string {
    if (typeof value === 'string') {
      return value
        .split(' ')
        .map((letter) => letter[0].toUpperCase() + letter.slice(1))
        .join(' ');
    }

    return value;
  }
}
