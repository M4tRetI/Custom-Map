import { TestBed } from '@angular/core/testing';

import { PlatformCustomizationService } from './platform-customization.service';

describe('PlatformCustomizationService', () => {
  let service: PlatformCustomizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformCustomizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
