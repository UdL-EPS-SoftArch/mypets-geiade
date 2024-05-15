import { Component, OnInit } from '@angular/core';
import { Adoptions } from '../adoptions';
import { Router } from '@angular/router';
import { AdoptionsService } from '../adoptions.service';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';
import { User } from 'src/app/login-basic/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-adoptions-add',
  templateUrl: './adoptions-add.component.html',
})
export class AdoptionsAddComponent implements OnInit{
  public adoptions: Adoptions;
  public user: User;

  constructor(private router: Router,
              private adoptionsService: AdoptionsService,
              private userService: UserService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    this.adoptions = new Adoptions();
    this.userService.getResource(this.getCurrentUserName()).subscribe(
      (user: User) => this.user = user );
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().username;
  }
}
