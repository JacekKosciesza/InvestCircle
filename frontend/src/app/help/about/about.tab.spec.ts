import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTab } from './about.tab';
import { SharedModule } from '../../shared';

describe(AboutTab.name, () => {
  let component: AboutTab;
  let fixture: ComponentFixture<AboutTab>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AboutTab],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
