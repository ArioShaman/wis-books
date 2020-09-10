import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.view.html',
  styleUrls: ['./authors.view.sass']
})
export class AuthorsView implements OnInit {

  constructor(
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
  }

  public openCreate(): void {
    this.router.navigate(['/authors/create']);
  }

}
