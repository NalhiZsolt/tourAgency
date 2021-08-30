import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualToursComponent } from './actual-tours.component';

describe('ActualToursComponent', () => {
  let component: ActualToursComponent;
  let fixture: ComponentFixture<ActualToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
