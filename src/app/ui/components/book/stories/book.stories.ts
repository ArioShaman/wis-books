import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';

import { BookComponent } from '../book.component';

export default {
  title: 'Components/Book',
  component: BookComponent,
  decorators: [
    moduleMetadata({
      declarations: [BookComponent],
      imports: [
        CommonModule,
        RouterModule.forRoot([]),
        MatCardModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    }),
  ]
};

const Template: Story<BookComponent> = (args: BookComponent) => ({
  component: BookComponent,
  props: args
});

const book = {
  id: 5,
  description: "Actually, I didn't make the claim that Ruby follows the principle of least surprise. Someone felt the design of Ruby follows that philosophy, so they started saying that. I didn't bring that up, actually.",
  author_id: 2,
  title: 'Cabbages and Kings',
  price: 1640.0,
  genres: [
    {
      id: 11,
      name: 'Mythopoeia'
    }
  ],
  previews: [],
  image: '/uploads/book/5/image/2524bf2226043e88b56bf5c090f322d6.jpg',
  writing_date: '2007-07-03T00:00:00.000Z',
  release_date: '2012-12-27T00:00:00.000Z'
};

export const Base = Template.bind({});
Base.args = {
  book
};
