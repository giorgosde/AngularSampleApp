import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent, UserCardComponent, UserDetailsComponent } from './components';
import { FormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserCardComponent,
    UserDetailsComponent
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class UsersModule { }
