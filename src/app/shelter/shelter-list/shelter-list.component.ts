import {Component, OnInit} from '@angular/core';
import {Shelter} from "../shelter";
import {Router} from "@angular/router";
import {ShelterService} from "../shelter.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-shelter-list',
  templateUrl: './shelter-list.component.html',
})
export class ShelterListComponent implements OnInit {
  public shelters: Shelter[] = [];
  public pageSize = 5;
  public page = 1;
  public totalShelters = 0;

  constructor(
    public router: Router,
    private shelterService: ShelterService,
  ) {}

  ngOnInit(): void {
    this.shelterService
      .getPage({
        pageParams: { size: this.pageSize },
        sort: { name: 'ASC' },
      })
      .subscribe((page: PagedResourceCollection<Shelter>) => {
        this.shelters = page.resources;
        console.log(this.shelters);
        this.totalShelters = page.totalElements;
      });
  }
  changePage(): void {
    this.shelterService
      .getPage({
        pageParams: { page: this.page - 1, size: this.pageSize },
        sort: { name: 'ASC' },
      })
      .subscribe(
        (page: PagedResourceCollection<Shelter>) => (this.shelters = page.resources)
      );
  }
}
