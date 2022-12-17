import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRemittanceComponent } from './send-remittance.component';

describe('SendRemittanceComponent', () => {
  let component: SendRemittanceComponent;
  let fixture: ComponentFixture<SendRemittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRemittanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
