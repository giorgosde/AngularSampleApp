import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly BASEURL = 'https://api.github.com';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASEURL}/users`);
  }

  getUser(userName: string): Observable<User> {
    return this.http.get<User>(`${this.BASEURL}/users/${userName}`);
  }

  getUserRepo(userName: string): Observable<User> {
    return this.http.get<User>(`${this.BASEURL}/users/${userName}/repos`);
  }
}
