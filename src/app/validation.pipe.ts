import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validation'
})
export class ValidationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? "Habilitado" : "Deshabilitado";
  }
}
