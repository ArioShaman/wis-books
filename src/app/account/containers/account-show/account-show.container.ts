import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-account-show',
  templateUrl: './account-show.container.html',
  styleUrls: ['./account-show.container.sass']
})
export class AccountShowContainer implements OnInit {

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) { }

  public ngOnInit(): void {
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

}
