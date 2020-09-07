import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoBlockComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {
  }

}
