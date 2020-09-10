import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.view.html',
  styleUrls: ['./genres.view.sass']
})
export class GenresView implements OnInit {

  constructor(
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
  }

  public openCreate(): void {
    this.router.navigate(['/genres/create']);
  }


}
