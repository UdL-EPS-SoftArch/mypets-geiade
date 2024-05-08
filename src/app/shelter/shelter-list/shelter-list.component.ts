import {Component, OnInit} from '@angular/core';
import {Shelter} from "../shelter";
import {Router} from "@angular/router";
import {ShelterService} from "../shelter.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
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
  public sortBy = 'name';
  public sortOrder = 'A-Z';

  constructor(
    public router: Router,
    private shelterService: ShelterService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    this.shelterService
      .getPage({
        pageParams: { size: this.pageSize },
        sort: { name: 'ASC' },
      })
      .subscribe((page: PagedResourceCollection<Shelter>) => {
        this.shelters = page.resources;
        this.totalShelters = page.totalElements;
        // for (let shelter of this.shelters) {
        //   this.shelterService.getBeneficialFor(seed.id).subscribe((response) => {
        //     seed.beneficialFor = response._embedded.seeds.map(
        //       (seed) => seed.scientificName
        //     );
        //   });
        // }
        // this.sortShelters();
      });
  }
  //
  // searchShelters(shelter: Shelter): void {
  //   this.router.navigate(['shelters', shelter.id]);
  // }
  //
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
  //
  // detail(shelter: Shelter): void {
  //   this.router.navigate(['seeds', seed.id]);
  // }
  //
  // isRole(role: string): boolean {
  //   return this.authenticationService.isRole(role);
  // }
  //
  // updateSelection(selection: string): void {
  //   this.sortBy = selection;
  //   this.sortShelters();
  // }
  //
  // updateSortOrder(order: string): void {
  //   this.sortOrder = order;
  //   this.sortShelters();
  // }
  //
  // sortShelters(): void {
  //   const returnValue = this.sortOrder === 'A-Z' ? -1 : 1;
  //   if (this.sortBy === 'Common name') {
  //     this.seeds.sort((a, b) => {
  //       const commonNamesA = a.commonName.join().toUpperCase();
  //       const commonNamesB = b.commonName.join().toUpperCase();
  //
  //       if (commonNamesA === '' && commonNamesB === '') {
  //         return 0;
  //       }
  //       if (commonNamesA === '') {
  //         return 1;
  //       }
  //       if (commonNamesB === '') {
  //         return -1;
  //       }
  //
  //       if (commonNamesA < commonNamesB) {
  //         return returnValue;
  //       }
  //       if (commonNamesA > commonNamesB) {
  //         return -returnValue;
  //       }
  //       return 0;
  //     });
  //   } else if (this.sortBy === 'Scientific name') {
  //     this.seeds.sort((a, b) => {
  //       const scientificNameA = a.scientificName.toUpperCase();
  //       const scientificNameB = b.scientificName.toUpperCase();
  //
  //       if (scientificNameA < scientificNameB) {
  //         return returnValue;
  //       }
  //       if (scientificNameA > scientificNameB) {
  //         return -returnValue;
  //       }
  //       return 0;
  //     });
  //   } else if (this.sortBy === 'Beneficial for') {
  //     this.seeds.sort((a, b) => {
  //       const beneficialForA = a.beneficialFor.join().toUpperCase();
  //       const beneficialForB = b.beneficialFor.join().toUpperCase();
  //
  //       if (beneficialForA === '' && beneficialForB === '') {
  //         return 0;
  //       }
  //       if (beneficialForA === '') {
  //         return 1;
  //       }
  //       if (beneficialForB === '') {
  //         return -1;
  //       }
  //
  //       if (beneficialForA < beneficialForB) {
  //         return returnValue;
  //       }
  //       if (beneficialForA > beneficialForB) {
  //         return -returnValue;
  //       }
  //       return 0;
  //     });
  //   }
  // }
}
