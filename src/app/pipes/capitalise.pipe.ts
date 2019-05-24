import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let firstChar = value.substring(0, 1);
    let allOtherChars = value.substring(1, value.length );

    let newValue = firstChar.toUpperCase() + allOtherChars.toLowerCase();

    return newValue;
  }

}
