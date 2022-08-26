import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeConfirmPasswordComponent } from './change-confirm-password.component';

describe('ChangeConfirmPasswordComponent', () => {
  let component: ChangeConfirmPasswordComponent;
  let fixture: ComponentFixture<ChangeConfirmPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeConfirmPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeConfirmPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
