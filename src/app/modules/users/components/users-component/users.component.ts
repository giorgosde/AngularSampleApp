import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  visibleUsers: User[] = [];
  hasError = false;
  subscritions: Subscription[] = [];

  @ViewChild('searchInput') searchInputChild: ElementRef;

  constructor(private usersService: UsersService,
              private router: Router,
              private renderer: Renderer2) {}

  ngOnInit(): void {
    this.getGithubUsers();
  }

  getGithubUsers(): void {
    this,this.subscritions.push(
        this.usersService.getUsers()
                            .subscribe((data: User[]) => this.users = this.visibleUsers = data,
                                        () => this.hasError = true));
  }

  goToUserDetails(username: string): void {
    this.router.navigate(['/user-details', username]);
  }

  filterUsers(): void {
    let term = this.searchInputChild.nativeElement.value.trim().toLowerCase();

    if (term && this.isTermValid(term)) {
      this.visibleUsers = this.users.filter((user: User) =>
                                      user?.login.toLowerCase().startsWith(term));
    }

    if (term == '') {
      this.visibleUsers = this.users;
    } 
  }

  isTermValid(stringValue: string): boolean {
    var validRegex = new RegExp(/^[A-Za-z]*/);      
    return validRegex.test(stringValue) ? true : false; 
  }

  resetFiltering(): void {
    this.renderer.setProperty(this.searchInputChild.nativeElement, 'value', '');
    this.visibleUsers = this.users;
  }

  ngOnDestroy(): void {
    this.subscritions.forEach((s: Subscription) => s.unsubscribe());
  }

}
