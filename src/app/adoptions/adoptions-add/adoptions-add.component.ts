import { Component, OnInit } from '@angular/core';
import { Adoptions } from '../adoptions';
import { Router } from '@angular/router';
import { AdoptionsService } from '../adoptions.service';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';
import { User } from 'src/app/login-basic/user';
import { UserService } from 'src/app/user/user.service';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-adoptions-add',
  templateUrl: './adoptions-add.component.html',
})
export class AdoptionsAddComponent implements OnInit{
  public adoptions: Adoptions;
  public user: User;
  public date: Date;

  constructor(private router: Router,
              private adoptionsService: AdoptionsService,
              private userService: UserService,
              private authenticationService: AuthenticationBasicService){
  }
  ngOnInit(): void {
    this.adoptions = new Adoptions();
  }

  onSubmit(): void {
    this.adoptionsService.createResource({body: this.adoptions}).subscribe(
      (adoptions:Adoptions) => this.router.navigate([adoptions.uri])
    );
  }
}
