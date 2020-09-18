import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSelectChange } from '@angular/material/select';

import { Observable } from 'rxjs';

import { MatAppearenceService } from './core/services/mat-appearence.service';
import { RansackService } from './core/services/ransack.service';
import { Ransack } from './core/models/ransack.enum';

const testFilters = {
  // author: [1, 2],
  authorId: [1, 2],
  price: {
    min: 1,
    max: 2000,
  },
  title: 'Nine Coaches Waiting'
};

const testOptions = {
  authorId: {
    matcher: Ransack.In,
    // postfix: 'id'
  },
  price: [
    {
      matcher: Ransack.Gt,
      from: 'min'
    },
    {
      matcher: Ransack.Lt,
      from: 'max'
    }
  ],
  title: Ransack.NotEq,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public activeAppearence: string;
  public appearences$ = new Observable<string[]>();


  constructor(
    private appearenceService: MatAppearenceService,
    private readonly rsService: RansackService,
    private readonly http: HttpClient
  ) {
    this.activeAppearence = appearenceService.getActiveAppearance();
  }

  public ngOnInit(): void {
    this.appearences$ = this.appearenceService.getAppearences();

    const params = {
      params: this.rsService.toRansack(testFilters, testOptions)
    };
    console.log(params);

    this.http.get('/books', params)
      .subscribe((res) => console.log(res));
  }

  public setActiveAppearence(event: MatSelectChange): void {
    this.appearenceService.setActiveAppearance(event.value);

    window.location.reload();
  }

}
