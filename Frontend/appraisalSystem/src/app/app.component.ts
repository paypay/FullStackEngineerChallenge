import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'appraisalSystem';
  user: any;
  constructor(private router: Router, private authService: AuthenticateService, private route: ActivatedRoute,) {

  }

  
  ngOnInit() {
    if (!localStorage.getItem('userObj')) {
      this.router.navigate(['/authenticate']);
    } else {
      console.log('this.route.snapshot', this.route.snapshot)
      this.user = JSON.parse(localStorage.getItem('userObj') || '{}');
      this.authService.userData.next(this.user);
      console.log('in else ', this.user)
      if (this.user && this.user.isAdmin) {
        this.router.navigate(['/admin'])
      } else if (this.user && !this.user.isAdmin) {
        this.router.navigate(['/employee'])
      } else {
        this.router.navigate(['/authenticate'])
      }


    }
  }
}
