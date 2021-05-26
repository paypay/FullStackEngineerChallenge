import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string=  '';
  public password: string=  '';
  public serverErrors = '';
  constructor(private _apiService: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(LoginForm){  
    this.serverErrors = ''; 
    this._apiService.login(LoginForm.value).subscribe(
      data => { 
        console.log(data);
        if (data && data['data']) {
          data  = data['data'][0];
          localStorage.setItem("userLogin", JSON.stringify(data));
          if (data['userType'] === 'admin') {
            this.router.navigateByUrl('/list-employee');
            this.localStorageService.set('logInFlag', true);
            this.localStorageService.set('logInType', 'admin');
          } else {
            this.router.navigateByUrl('/dashboard');
            this.localStorageService.set('logInFlag', true);
            this.localStorageService.set('logInType', 'user');
          }
        } else {
          this.serverErrors = data['message'];
        }
       
      },
      err => 
        console.error(err)
    );
  } 
}
