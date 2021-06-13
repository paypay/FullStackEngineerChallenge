import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = {
    name: 'User',
    isAdmin: true
  }
  isExpanded = false;
  constructor(private router: Router, private authService: AuthenticateService,) { }

  ngOnInit(): void {
    this.authService.userData.subscribe(data => {
      this.user.name = data['name'] !== '' ? data['name'] : 'User';
      this.user.isAdmin = data['isAdmin'];
    })
  }

  logout() {
    this.user.name = 'User';
    this.user.isAdmin = false;
    localStorage.removeItem('userObj');
    this.router.navigate(['/authenticate'])
  }

}
