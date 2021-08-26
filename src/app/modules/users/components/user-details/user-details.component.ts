import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  hasError = false;
  user: User;
  repositories: any[] = [];
  subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService){}

  ngOnInit(): void {
    const userName = this.route.snapshot.paramMap.get('id');
    this.getUserDetails(userName);
  }

  getUserDetails(userName: string): void {
    this.subscriptions.push(
        this.usersService.getUser(userName)
                            .subscribe((data: User) => this.user = data,
                                      () => this.hasError = true));

    this.subscriptions.push(
        this.usersService.getUserRepo(userName)
                            .subscribe((data: any) => this.repositories = data,
                                      () => this.hasError = true));
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }
}
