import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public loginType: any;
  public userData;
  constructor(
    public localStorageService:LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginType       =   this.localStorageService.get('logInType');
  }

  logoff() {
    localStorage.clear();
    this.router.navigateByUrl('/');

  }
}
