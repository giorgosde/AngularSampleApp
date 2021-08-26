import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersComponent } from './users.component';
import { UsersService } from '../../services';
import { User } from '../../models/user.model';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockUsers: User [] = [
    {
      login: 'Peter'
    },
    {
      login: 'Erika'
    },
    {
      login: 'Andrew'
    },
    {
      login: 'Betty'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        UsersService,
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call getGithubUsers()', () => {
      const spy = spyOn(component, 'getGithubUsers');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#getGithubUsers', () => {
    it('should call usersService', () => {
      const userService = TestBed.inject(UsersService);
      const spy = spyOn(userService, 'getUsers').and.returnValue(of());
      component.getGithubUsers();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#goToUserDetails', () => {
    it('should call router navigate to user-details', () => {
      component.goToUserDetails('mockName');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/user-details', 'mockName']);
    });
  });

  describe('#filterUsers', () => {
    it('should return filtered Users when term is valid', () => {
      component.users = mockUsers;

      component.searchInputChild.nativeElement.value = 'be';
      component.filterUsers();
      fixture.detectChanges();

      expect(component.users.length).toBe(4);
    });

    it('should reset Users when term is empty string', () => {
      component.users = mockUsers;
      component.visibleUsers = [];

      component.searchInputChild.nativeElement.value = '';
      component.filterUsers();
      fixture.detectChanges();

      expect(component.visibleUsers.length).toEqual(4);
    });
  });

  describe('#resetFiltering', () => {
    it('should reset filtered values', () => {
      component.users = mockUsers;
      component.visibleUsers = [];
      component.searchInputChild.nativeElement.value = 'foobar';

      component.resetFiltering();
      fixture.detectChanges;

      expect(component.searchInputChild.nativeElement.value).toBe('');
      expect(component.visibleUsers).toEqual(component.users);
    });
  });

});
