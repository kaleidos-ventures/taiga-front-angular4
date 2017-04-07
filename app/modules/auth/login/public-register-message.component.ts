import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import { ConfigurationService } from "../../base/conf";

@Component({
    selector: "tg-public-register-message",
    template: require("./public-register-message.pug"),
})
export class PublicRegisterMessage implements OnInit {
    publicRegisterEnabled;
    queryParams;

    constructor(private config: ConfigurationService, private activeRoute: ActivatedRoute) {
        this.publicRegisterEnabled = this.config.get("publicRegisterEnabled");
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params) => {
            this.queryParams = params;
        });
    }
}
