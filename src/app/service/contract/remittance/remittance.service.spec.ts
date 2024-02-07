import { TestBed } from '@angular/core/testing';

import { RemittanceService } from './remittance.service';

describe('RemittanceService', () => {
  let service: RemittanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemittanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
