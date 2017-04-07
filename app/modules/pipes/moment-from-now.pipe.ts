import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({name: 'momentFromNow'})
export class MomentFromNowPipe implements PipeTransform {
    transform(input: Date, without_suffix:boolean = false): string {
        if (input) {
            return moment(input).fromNow(without_suffix);
        }
        return "";
    }
}
