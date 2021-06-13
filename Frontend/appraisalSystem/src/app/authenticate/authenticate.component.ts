import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

interface User {
  name: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  model: any = {
    empId: ''
  };
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticateService,
   ) { }

  ngOnInit() {
    // reset login status
  /*  this.authenticationService.logout();*/

    // get return url from route parameters or default to '/'
    
  }

  login() {
    const reqObj = {
      id: this.model.empId,
      password: "Password-" + this.model.empId
    }
    this.authService.login(reqObj)
      .subscribe(
        data => {
          localStorage.setItem('userObj', JSON.stringify(data));
          this.authService.userData.next(data);
          var obj = data;
          if (data['isAdmin']) {
            this.router.navigate(['/admin'])
          } else if (!data['isAdmin']) {
            this.router.navigate(['/employee'])
          }
         
        },
        error => {
        
        });
  }
}
