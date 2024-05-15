import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { AdoptionsService } from '../adoptions.service';
import { Adoptions } from '../adoptions';

@Component({
  selector: 'app-adoptions-edit',
  templateUrl: './adoptions-edit.component.html',
})
export class AdoptionsEditComponent implements OnInit {
  public adoptions: Adoptions = new Adoptions();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adoptionsService: AdoptionsService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.adoptionsService.getResource(id).subscribe(
      (adoptions: Adoptions) => this.adoptions = adoptions );
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().username;
  }
}
