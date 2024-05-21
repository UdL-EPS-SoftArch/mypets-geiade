import {Component, OnInit} from '@angular/core';
import {Dog} from "../dog";
import {Router} from "@angular/router";
import {DogService} from "../dog.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
})
export class DogListComponent implements OnInit {
  public dogs: Dog[] = [];
  public pageSize = 5;
  public page = 1;
  public totalDogs = 0;

  constructor(
    public router: Router,
    private dogService: DogService,
  ) {}

  ngOnInit(): void {
    this.dogService
      .getPage({
        pageParams: { size: this.pageSize },
        sort: { name: 'ASC' },
      })
      .subscribe((page: PagedResourceCollection<Dog>) => {
        this.dogs = page.resources;
        this.totalDogs = page.totalElements;
      });
  }

  changePage(): void {
    this.dogService
      .getPage({
        pageParams: { page: this.page - 1, size: this.pageSize },
        sort: { name: 'ASC' },
      })
      .subscribe(
        (page: PagedResourceCollection<Dog>) => (this.dogs = page.resources)
      );
  }

  detail(dog: Dog): void {
    this.router.navigate(['/dogs', dog.id]);
  }

}
