import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfNudosComponent } from './conf-nudos.component';

describe('ConfNudosComponent', () => {
  let component: ConfNudosComponent;
  let fixture: ComponentFixture<ConfNudosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfNudosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfNudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
