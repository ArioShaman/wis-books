import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurposeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
