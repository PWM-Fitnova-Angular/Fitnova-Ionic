import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
})
export class ExerciseCardComponent {
  @Input() cardLabel!: string;
  @Input() cardTitle!: string;
  @Input() cardImage!: any;
  @Input() cardObject!: any;

  constructor() { }


}
