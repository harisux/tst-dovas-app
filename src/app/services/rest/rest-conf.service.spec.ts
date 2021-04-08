import { TestBed } from '@angular/core/testing';

import { RestConfService } from './rest-conf.service';

describe('RestConfService', () => {
  let service: RestConfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestConfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
