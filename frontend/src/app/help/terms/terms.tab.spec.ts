import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsTab } from './terms.tab';
import { SharedModule } from '../../shared';

describe(TermsTab.name, () => {
  let component: TermsTab;
  let fixture: ComponentFixture<TermsTab>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [TermsTab],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
