import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsWorkoutRecipeComponent } from './details-workout-recipe.component';

describe('DetailsWorkoutRecipeComponent', () => {
  let component: DetailsWorkoutRecipeComponent;
  let fixture: ComponentFixture<DetailsWorkoutRecipeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsWorkoutRecipeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsWorkoutRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
