import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookConfirmComponent } from './book-confirm.component';

describe('BookConfirmComponent', () => {
  let component: BookConfirmComponent;
  let fixture: ComponentFixture<BookConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
