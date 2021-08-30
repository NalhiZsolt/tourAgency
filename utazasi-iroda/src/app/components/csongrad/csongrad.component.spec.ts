import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsongradComponent } from './csongrad.component';

describe('CsongradComponent', () => {
  let component: CsongradComponent;
  let fixture: ComponentFixture<CsongradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsongradComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsongradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
