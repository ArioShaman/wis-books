import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDeleteComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {
  }

}
