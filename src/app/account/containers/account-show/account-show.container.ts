import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-account-show',
  templateUrl: './account-show.container.html',
  styleUrls: ['./account-show.container.sass']
})
export class AccountShowContainer implements OnInit {

  @ViewChild('myCanvas', { static: true })
  public myCanvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  public chart = [];

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) {
  }

  public ngOnInit(): void {
    this._initChart();

    this.matIconRegistry.addSvgIcon(
      'out',
      this.domSanitizer
        .bypassSecurityTrustResourceUrl('../../../../assets/icons/out.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'book',
      this.domSanitizer
        .bypassSecurityTrustResourceUrl('../../../../assets/icons/book.svg')
    );
  }

  private _initChart(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');

    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [{
          backgroundColor: 'rgb(73, 77, 213)',
          borderColor: 'rgb(73, 77, 213)',
          data: [0, 10, 5, 2, 18, 12, 15]
        }]
      },
      options: {
        legend: {
          display: false
        },
        plugins: {
          filler: {
            propagate: true
          }
        }
      }
    });
  }

}
