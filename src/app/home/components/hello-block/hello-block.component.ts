import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hello-block',
  templateUrl: './hello-block.component.html',
  styleUrls: ['./hello-block.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloBlockComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void { }

}
