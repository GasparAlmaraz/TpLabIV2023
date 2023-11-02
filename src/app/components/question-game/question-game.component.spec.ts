import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGameComponent } from './question-game.component';

describe('QuestionGameComponent', () => {
  let component: QuestionGameComponent;
  let fixture: ComponentFixture<QuestionGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionGameComponent]
    });
    fixture = TestBed.createComponent(QuestionGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
