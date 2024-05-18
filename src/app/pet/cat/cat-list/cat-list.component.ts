import {Component, OnInit} from '@angular/core';
import {Cat} from "../cat";
import {Router} from "@angular/router";
import {CatService} from "../cat.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
})
export class CatListComponent implements OnInit {
  public cats: Cat[] = [];
  public pageSize = 5;
  public page = 1;
  public totalCats = 0;

  constructor(
    public router: Router,
    private catService: CatService,
  ) {}

  ngOnInit(): void {
    this.catService
      .getPage({
        pageParams: { size: this.pageSize },
        sort: { name: 'ASC' },
      })
      .subscribe((page: PagedResourceCollection<Cat>) => {
        this.cats = page.resources;
        this.totalCats = page.totalElements;
      });
  }

  changePage(): void {
    this.catService
      .getPage({
        pageParams: { page: this.page - 1, size: this.pageSize },
        sort: { name: 'ASC' },
      })
      .subscribe(
        (page: PagedResourceCollection<Cat>) => (this.cats = page.resources)
      );
  }
}
