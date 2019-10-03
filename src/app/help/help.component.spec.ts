import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTabsModule } from '@angular/material';

import { HelpComponent } from './help.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatTabsModule, NoopAnimationsModule],
      declarations: [HelpComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
