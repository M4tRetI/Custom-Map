import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'arraybr'
})
export class ArraybrPipe implements PipeTransform {
  transform (value: Array <string>, ...args: unknown[]): string {
    return value.join ('<br>');
  }
}
