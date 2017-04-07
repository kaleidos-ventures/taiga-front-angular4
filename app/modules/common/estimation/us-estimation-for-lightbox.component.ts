import {Component, Input, OnChanges, forwardRef} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    selector: "tg-us-estimation-for-lightbox",
    template: require("./us-estimation-for-lightbox.pug"),
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UsEstimationForLightbox),
        multi: true
      }
    ]
})
export class UsEstimationForLightbox implements ControlValueAccessor, OnChanges {
    @Input() roles;
    @Input() points;
    private roleOpen: number = null;
    computableRoles: Immutable.List<any> = Immutable.List();
    _value: any = {};
    onChange: any;

    ngOnChanges() {
        if (this.roles) {
            this.computableRoles = this.roles.filter((role) => role.get("computable"));
        }
    }
    writeValue(value: any) {
        this.value = value;
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        if (this.onChange) {
            this.onChange(val);
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched() {}


    openRole(roleId) {
        this.roleOpen = roleId;
    }

    onPointsSelect(roleId, pointsId) {
        this.roleOpen = null;
        this.value[roleId] = pointsId
    }

    getRolePoints(roleId) {
        let pointsId = this.value[roleId]
        return this.points.groupBy((p) => p.get('id')).map((p) => p.first()).getIn([pointsId, 'name'])
    }

    getRolePointsValue(pointsId) {
        return this.points.groupBy((p) => p.get('id')).map((p) => p.first()).getIn([pointsId, 'value']) || 0
    }

    totalPoints() {
        return _.sum(_.map(this.getRolePointsValue.bind(this), _.values(this.value)))
    }
}
