import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyTab } from './privacy.tab';
import { SharedModule } from '../../shared';

describe(PrivacyTab.name, () => {
  let component: PrivacyTab;
  let fixture: ComponentFixture<PrivacyTab>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PrivacyTab],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
