/*
 * Copyright (C) 2014-2017 Taiga Agile LLC <taiga@taiga.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: date-picker.controller.coffee
 */

import {Component, OnInit, Input, forwardRef, Output, EventEmitter, ElementRef, AfterContentInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {TranslateService} from "@ngx-translate/core"
import * as Pikaday from "pikaday";
import * as moment from "moment";
import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    selector: "tg-date-picker",
    template: "<input type='text' [value]='fieldValue' [placeholder]='placeholder'/>",
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatePicker),
        multi: true
      }
    ]
})
export class DatePicker implements ControlValueAccessor, OnInit, AfterContentInit {
    @Input() placeholder: string;
    @Output() dateSelected: EventEmitter<moment.Moment>;
    fieldValue: string = null;
    _date: moment.Moment = null;
    onChange: any;
    picker: Pikaday;

    constructor(private translate: TranslateService, private element: ElementRef) {
        this.dateSelected = new EventEmitter();
    }

    ngAfterContentInit() {
        this.translate.get("COMMON.PICKERDATE").first().subscribe(() => {
            let config = {
                i18n: {
                    previousMonth: this.translate.instant("COMMON.PICKERDATE.PREV_MONTH"),
                    nextMonth:  this.translate.instant("COMMON.PICKERDATE.NEXT_MONTH"),
                    months: [
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.JAN"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.FEB"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.MAR"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.APR"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.MAY"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.JUN"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.JUL"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.AUG"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.SEP"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.OCT"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.NOV"),
                        this.translate.instant("COMMON.PICKERDATE.MONTHS.DEC")
                    ],
                    weekdays: [
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS.SUN"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS.MON"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS.TUE"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS.WED"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS.THU"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS.FRI"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS.SAT")
                    ],
                    weekdaysShort: [
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS_SHORT.SUN"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS_SHORT.MON"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS_SHORT.TUE"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS_SHORT.WED"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS_SHORT.THU"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS_SHORT.FRI"),
                        this.translate.instant("COMMON.PICKERDATE.WEEK_DAYS_SHORT.SAT")
                    ]
                },
                isRTL: this.translate.instant("COMMON.PICKERDATE.IS_RTL") == "true",
                firstDay: parseInt(this.translate.instant("COMMON.PICKERDATE.FIRST_DAY_OF_WEEK"), 10),
                format: this.translate.instant("COMMON.PICKERDATE.FORMAT"),
                field: this.element.nativeElement.getElementsByTagName('input')[0],
                onSelect: (date) => {
                    this.date = this.picker.getMoment();
                }
            }
            this.picker = new Pikaday(config)
            this.picker.setDate(this.date);
        });
    }

    ngOnInit() {}

    writeValue(value: moment.Moment) {
        if (this.picker) {
            this.picker.setDate(value);
            this.date = value;
        } else {
            setTimeout(() => this.writeValue(value), 30);
        }
    }

    get date() {
        return this._date;
    }

    set date(val) {
        this._date = val;
        this.dateSelected.emit(val);
        if (this.onChange) {
            this.onChange(val);
        }
        if (val) {
            this.fieldValue = val.format(this.translate.instant("COMMON.PICKERDATE.FORMAT"))
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched() {}

    ngOnDestroy() {
        this.picker.destroy();
    }
}
