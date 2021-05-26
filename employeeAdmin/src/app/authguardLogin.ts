import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardLog implements CanActivate {
    constructor(public localStorageService:LocalStorageService, private router: Router){}
    canActivate() {
        var logInFlag       =   this.localStorageService.get('logInFlag');
        var logInType       =   this.localStorageService.get('logInType');
        console.log('-------------------------LOGIN Back FLAG---------------------------');
        console.log(logInFlag);
        console.log('-------------------------LOGIN Back FLAG---------------------------');
        if(logInFlag == true){
            if(logInType == 'admin'){
                this.router.navigateByUrl('/list-reviews');
            } else {
                this.router.navigateByUrl('/dashboard');
            }
            return false;
        }else{
            return true;
        }
    }

}
