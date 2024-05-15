import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Adoptions } from '../adoptions';
import { AdoptionsService } from '../adoptions.service';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
  selector: 'app-adoptions-list',
  templateUrl: './adoptions-list.component.html'
})
export class AdoptionsListComponent implements OnInit{
  public adoptions: Adoptions[] = [];
  public pageSize = 5;
  public page = 1;
  public totalAdoptions = 0;
  @Output() emitResults = new EventEmitter<Adoptions>();

  constructor(
    public router: Router,
    private adoptionsService: AdoptionsService) {
  }

  ngOnInit(): void {
    this.adoptionsService.getPage({ pageParams:  { size: this.pageSize }, sort: { id: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Adoptions>) => {
        this.adoptions = page.resources;
        this.totalAdoptions = page.totalElements;
      });
  }

  changePage(): void {
    this.adoptionsService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { id: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Adoptions>) => this.adoptions = page.resources);
  }

  detail(adoptions: Adoptions): void {
    this.router.navigate(['adoptions', adoptions.id]);
  }

}
