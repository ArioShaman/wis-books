import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';

import { Book } from '../../models/book.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

  @Input('book')
  public book: Book;
  public imageSrc: string;

  @Output('genreFilter')
  private _genreFilter = new EventEmitter<string[]>();

  public ngOnInit(): void {
    if (this.book.image) {
      this.imageSrc = environment.hosts.imgHost + this.book.image;
    }
  }

  public filterByGenre(genre: string[]): void {
    this._genreFilter.emit(genre);
  }

}

