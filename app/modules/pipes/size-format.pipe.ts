import { Pipe, PipeTransform } from '@angular/core';
import { sizeFormat } from "../../libs/utils";

@Pipe({name: 'sizeFormat'})
export class SizeFormatPipe implements PipeTransform {
  transform(input: number): string {
      return sizeFormat(input);
  }
}
