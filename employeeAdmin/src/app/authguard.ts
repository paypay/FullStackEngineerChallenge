import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public localStorageService:LocalStorageService, private router: Router){}
    canActivate() {
        var logInFlag       =   this.localStorageService.get('logInFlag');
        console.log('-------------------------LOGIN FLAG---------------------------');
        console.log(logInFlag);
        console.log('-------------------------LOGIN FLAG---------------------------');
        if(logInFlag == true){
            return true;
        }else{
            this.router.navigateByUrl('/');
            return false;
        }
    }

}
