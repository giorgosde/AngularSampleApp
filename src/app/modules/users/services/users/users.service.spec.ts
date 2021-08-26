import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should return an observable', () => {
      service.getUsers().subscribe(result =>
        expect(result.length).toBeGreaterThan(0));

      const request = httpMock.expectOne( `${service.BASEURL}/users`);
      expect(request.request.method).toBe('GET');
    });
  });

  describe('#getUser', () => {
    it('should return an observable', () => {
      service.getUser('mockName').subscribe(result =>
        expect(result).not.toBe(null));

      const request = httpMock.expectOne( `${service.BASEURL}/users/${'mockName'}`);
      expect(request.request.method).toBe('GET');
    });
  });

  describe('#getUserRepo', () => {
    it('should return an observable', () => {
      service.getUserRepo('mockName').subscribe(result =>
        expect(result).not.toBe(null));

      const request = httpMock.expectOne( `${service.BASEURL}/users/${'mockName'}/repos`);
      expect(request.request.method).toBe('GET');
    });
  });
});
