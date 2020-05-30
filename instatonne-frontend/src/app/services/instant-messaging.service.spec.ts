import { TestBed } from '@angular/core/testing';

import { InstantMessagingService } from './instant-messaging.service';

describe('InstantMessagingService', () => {
  let service: InstantMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstantMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
