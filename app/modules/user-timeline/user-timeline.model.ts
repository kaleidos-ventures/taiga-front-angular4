export class EventType {
    constructor(public section:string, public obj:string, public type:string) {}

    static fromString(eventString): EventType {
        let splitted = eventString.split(".");
        return new EventType(splitted[0], splitted[1], splitted[2]);
    }
}
