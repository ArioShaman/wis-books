import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

import { IStep } from '../../../core/models/step.interface';

@Component({
  selector: 'app-step-buttons',
  templateUrl: './step-buttons.component.html',
  styleUrls: ['./step-buttons.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepButtonsComponent implements OnInit {

  @Input('activeStep')
  public activeStep;

  @Input('steps')
  public steps: IStep[];

  @Output('action')
  public action = new EventEmitter<string>();

  constructor() { }

  public ngOnInit(): void {
  }

  public nextStep(): void {
    this.action.next('next');
  }

  public prevStep(): void {
    this.action.next('prev');
  }

}
