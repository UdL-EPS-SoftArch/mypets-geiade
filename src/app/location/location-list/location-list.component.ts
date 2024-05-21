
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import {Location} from "../location";

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {
  public locations: Location[] = [];
  public pageSize = 5;
  public page = 1;
  public totalLocations = 0;

  constructor(
    public router: Router,
    private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locationService.getPage({ pageParams:  { size: this.pageSize }, sort: { id: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Location>) => {
        this.locations = page.resources;
        this.totalLocations = page.totalElements;
      });
  }

  changePage(): void {
    this.locationService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { id: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Location>) => this.locations = page.resources);
  }

  detail(location: Location): void {
    this.router.navigate(['locations', location.id]);
  }
}
