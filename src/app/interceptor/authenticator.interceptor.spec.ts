import { TestBed } from '@angular/core/testing';

import { AuthenticatorInterceptor } from './authenticator.interceptor';

describe('AuthenticatorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthenticatorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthenticatorInterceptor = TestBed.inject(AuthenticatorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
