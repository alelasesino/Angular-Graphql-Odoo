import { TestBed } from '@angular/core/testing';

import { RegisterReceptionService } from './register-reception.service';

describe('RegisterReceptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterReceptionService = TestBed.get(RegisterReceptionService);
    expect(service).toBeTruthy();
  });
});
