import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersDialogComponent } from './passengers-dialog.component';

describe('PassengersDialogComponent', () => {
  let component: PassengersDialogComponent;
  let fixture: ComponentFixture<PassengersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassengersDialogComponent]
    });
    fixture = TestBed.createComponent(PassengersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
