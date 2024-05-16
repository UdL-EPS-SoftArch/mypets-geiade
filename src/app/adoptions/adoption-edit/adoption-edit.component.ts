import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { AdoptionService } from '../adoption.service';
import { Adoption } from '../adoption';

@Component({
  selector: 'app-adoption-edit',
  templateUrl: './adoption-edit.component.html',
})
export class AdoptionEditComponent implements OnInit {
  public adoption: Adoption = new Adoption();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adoptionsService: AdoptionService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.adoptionsService.getResource(id).subscribe(
      (adoption: Adoption) => this.adoption = adoption );
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().username;
  }
}
