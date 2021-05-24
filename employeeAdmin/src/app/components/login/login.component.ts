import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
          localStorage.setItem("user_login", JSON.stringify(data));
          if (data['userType'] === 'admin') {
            this.router.navigateByUrl('/dashboard');
          } else {
            this.router.navigateByUrl('/dashboard');
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
