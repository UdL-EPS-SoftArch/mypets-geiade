import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Adoption } from '../adoption';
import { AdoptionService } from '../adoption.service';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html'
})
export class AdoptionListComponent implements OnInit{
  public adoption: Adoption[] = [];
  public pageSize = 5;
  public page = 1;
  public totalAdoption = 0;

  constructor(
    public router: Router,
    private adoptionService: AdoptionService) {
  }

  ngOnInit(): void {
    this.adoptionService.getPage({ pageParams:  { size: this.pageSize }, sort: { id: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Adoption>) => {
        this.adoption = page.resources;
        this.totalAdoption = page.totalElements;
      });
  }

  changePage(): void {
    this.adoptionService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { id: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Adoption>) => this.adoption = page.resources);
  }

  detail(adoption: Adoption): void {
    this.router.navigate(['adoption', adoption.id]);
  }

}
