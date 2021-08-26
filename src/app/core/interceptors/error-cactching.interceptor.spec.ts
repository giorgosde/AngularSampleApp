import { TestBed } from '@angular/core/testing';
import { ErrorCactchingInterceptor } from './error-cactching.interceptor';

describe('ErrorCactchingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorCactchingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorCactchingInterceptor = TestBed.inject(ErrorCactchingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
