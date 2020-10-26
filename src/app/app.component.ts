import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'

import { MatSelectChange } from '@angular/material/select';

import { Observable } from 'rxjs';

import { MatAppearenceService } from './core/services/mat-appearence.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public activeAppearence: string;
  public appearences$ = new Observable<string[]>();

  @ViewChild('sidenav')
  public sidenav;

  constructor(
    private appearenceService: MatAppearenceService,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.activeAppearence = appearenceService.getActiveAppearance();
  }

  public ngOnInit(): void {
    this.appearences$ = this.appearenceService.getAppearences();
    this.auth.checkCache();
  }

  public setActiveAppearence(event: MatSelectChange): void {
    this.appearenceService.setActiveAppearance(event.value);

    window.location.reload();
  }

  public logOut(): void {
    this.sidenav.toggle();
    this.auth.logOut();
    // this.router.navigate(['/auth/sign-in']);
  }

}
