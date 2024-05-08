import { Component } from '@angular/core';
import {Shelter} from "../shelter";
import {Router} from "@angular/router";
import {ShelterService} from "../shelter.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";

@Component({
  selector: 'app-shelter-list',
  standalone: true,
  imports: [],
  templateUrl: './shelter-list.component.html',
})
export class ShelterListComponent {
  public shelters: Shelter[] = [];
  public pageSize = 5;
  public page = 1;
  public totalSeeds = 0;
  public sortBy = 'Scientific name';
  public sortOrder = 'A-Z';

  constructor(
    public router: Router,
    private shelterService: ShelterService,
    private authenticationService: AuthenticationBasicService
  ) {}

}
