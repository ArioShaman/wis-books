import { Component, OnInit } from '@angular/core';

import { MatSelectChange } from '@angular/material/select';

import { Observable } from 'rxjs';

import { MatAppearenceService } from './core/services/mat-appearence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public activeAppearence: string;
  public appearences$ = new Observable<string[]>();


  constructor(
    private appearenceService: MatAppearenceService
  ) {
    this.activeAppearence = appearenceService.getActiveAppearance();
  }

  public ngOnInit(): void {
    this.appearences$ = this.appearenceService.getAppearences();
  }

  public setActiveAppearence(event: MatSelectChange): void {
    this.appearenceService.setActiveAppearance(event.value);
    window.location.reload();
  }

}
