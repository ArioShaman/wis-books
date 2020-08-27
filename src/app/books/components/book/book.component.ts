import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';

import { Book } from '../../models/book.model';
import { Genre } from '../../../genres/models/genre.model';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

  @Input('book') public book: Book;
  @Output('genreFilter') private genreFilter = new EventEmitter<Genre>();

  public ngOnInit(): void {}

  public filterByGenre(genre: Genre): void {
    this.genreFilter.emit(genre);
  }

}

