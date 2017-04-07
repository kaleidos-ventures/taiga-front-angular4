import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({name: 'momentFormat'})
export class MomentFormatPipe implements PipeTransform {
  transform(input: Date, format: string): string {
      if (input) {
          return moment(input).format(format);
      }
      return "";
  }
}
