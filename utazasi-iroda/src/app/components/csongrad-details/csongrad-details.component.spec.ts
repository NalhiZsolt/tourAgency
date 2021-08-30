import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsongradDetailsComponent } from './csongrad-details.component';

describe('CsongradDetailsComponent', () => {
  let component: CsongradDetailsComponent;
  let fixture: ComponentFixture<CsongradDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsongradDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsongradDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
