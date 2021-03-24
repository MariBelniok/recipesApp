import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = '';
    @ViewChild(PlaceHolderDirective, { static:false }) alertHost: PlaceHolderDirective;

    private sub: Subscription;

    constructor(private auth: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if(!form.value){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if(this.isLoginMode){
            authObs = this.auth.login(email, password);
        }else{
            authObs = this.auth.signup(email, password)
        }

        authObs.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes'])
        }, errorRes => {
            console.log(errorRes);
            this.error = errorRes;
            this.showErrorAlert(errorRes);
            this.isLoading = false;
        });

        form.reset();
    }

    onHandleError(){
        this.error = null;
    }

    ngOnDestroy(){
        if(this.sub){
            this.sub.unsubscribe();
        }
    }

    private showErrorAlert(error: string){
        // const alert = new AlertComponent
        const alertComponentFactory = this
        .componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

        componentRef.instance.message = error;
        this.sub = componentRef.instance.close.subscribe(() => {
            this.sub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

}