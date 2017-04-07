import { Component, Directive, Input, TemplateRef, ViewContainerRef, ComponentFactoryResolver, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { IState } from "../../app.store";
import { Subscription } from "rxjs";

@Component({
    template: `<img class='loading-spinner big' src='/${_version}/svg/spinner-circle.svg' alt='loading...' />`
})
export class BigLoadingAux {}

@Component({
    template: `<img class='loading-spinner medium' src='/${_version}/svg/spinner-circle.svg' alt='loading...' />`
})
export class MediumLoadingAux {}

@Component({
    template: `<img class='loading-spinner small' src='/${_version}/svg/spinner-circle.svg' alt='loading...' />`
})
export class SmallLoadingAux {}

@Component({
    template: `<img class='loading-spinner tiny' src='/${_version}/svg/spinner-circle.svg' alt='loading...' />`
})
export class TinyLoadingAux {}

@Directive({selector: '[tgLoading]'})
export class LoadingDirective implements OnInit, OnDestroy {
    @Input() tgLoadingSize: string = "small";
    @Input() tgLoading: string;
    private subscription: Subscription;

    constructor(private templateRef: TemplateRef<any>,
				private viewContainer: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private store: Store<IState>) {}

    ngOnInit() {
        this.subscription = this.store.select((state) => state.getIn(["global", "loading-items", this.tgLoading])).subscribe((loading) => {
            if (!loading) {
                this.viewContainer.clear()
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else if (loading) {
                let loadingFactory;
                if(this.tgLoadingSize === "big") {
                    loadingFactory = this.componentFactoryResolver.resolveComponentFactory(BigLoadingAux);
                } else if(this.tgLoadingSize === "medium") {
                    loadingFactory = this.componentFactoryResolver.resolveComponentFactory(MediumLoadingAux);
                } else if(this.tgLoadingSize === "small") {
                    loadingFactory = this.componentFactoryResolver.resolveComponentFactory(SmallLoadingAux);
                } else if(this.tgLoadingSize === "tiny") {
                    loadingFactory = this.componentFactoryResolver.resolveComponentFactory(TinyLoadingAux);
                } else {
                    loadingFactory = this.componentFactoryResolver.resolveComponentFactory(SmallLoadingAux);
                }
                this.viewContainer.clear()
                let component = this.viewContainer.createComponent(loadingFactory)
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
