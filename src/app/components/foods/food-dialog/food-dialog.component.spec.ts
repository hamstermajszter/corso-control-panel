import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDialogComponent } from './new-food.component';

describe('FoodDialogComponent', () => {
  let component: FoodDialogComponent;
  let fixture: ComponentFixture<FoodDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
