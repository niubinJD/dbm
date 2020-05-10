import { TestBed } from '@angular/core/testing';

import { ConnectManagerService } from './connect-manager.service';

describe('ConnectManagerService', () => {
  let service: ConnectManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
