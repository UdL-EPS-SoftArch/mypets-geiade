import { Component, OnInit } from '@angular/core';
import { Adoptions } from '../adoptions';
import { Router } from '@angular/router';
import { AdoptionsService } from '../adoptions.service';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';

@Component({
  selector: 'app-adoptions-add',
  templateUrl: './adoptions-add.component.html',
})
export class AdoptionsAddComponent implements OnInit{
  public adoptions: Adoptions;
  public date: Date;

  constructor(private router: Router,
              private adoptionsService: AdoptionsService,
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
