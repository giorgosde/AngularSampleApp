import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UsersService } from '../../services';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ UserDetailsComponent ],
      providers: [
        UsersService,
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({id: 'mockName'})
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#goBack', () => {
    it('should call router navigate', () => {
      component.goBack();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });


  describe('#getUserDetails', () => {
  it('should call usersService getUser', () => {
    const userService = TestBed.inject(UsersService);
    const spy = spyOn(userService, 'getUser').and.returnValue(of());
    component.getUserDetails('mockName');
    expect(spy).toHaveBeenCalled();
  });

  it('should call usersService getUserRepo', () => {
    const userService = TestBed.inject(UsersService);
    const spy = spyOn(userService, 'getUserRepo').and.returnValue(of());
    component.getUserDetails('mockName');
    expect(spy).toHaveBeenCalled();
  });
 });
});
