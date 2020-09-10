import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Book } from '../../../books/models/book.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-author-book-card',
  templateUrl: './author-book-card.component.html',
  styleUrls: ['./author-book-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorBookCardComponent implements OnInit {

  @Input('book')
  public book: Book;
  public imageSrc: string;

  constructor() { }

  public ngOnInit(): void {
    if (this.book.image) {
      this.imageSrc = environment.hosts.imgHost + this.book.image;
    }
  }

}
