import {Component, OnInit} from '@angular/core';
import {Shelter} from "../shelter";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {ShelterService} from "../shelter.service";

@Component({
  selector: 'app-shelter-detail',
  templateUrl: './shelter-detail.component.html',
})
export class ShelterDetailComponent implements OnInit{
  shelterDetail: Shelter;
  constructor(
    private route: ActivatedRoute,
    private shelterService: ShelterService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.shelterService.getResource(id).subscribe((shelter: Shelter) => {
      this.shelterDetail = shelter;
    });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }
}
