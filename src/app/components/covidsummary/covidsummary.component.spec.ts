import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidsummaryComponent } from './covidsummary.component';

describe('CovidsummaryComponent', () => {
  let component: CovidsummaryComponent;
  let fixture: ComponentFixture<CovidsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidsummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
