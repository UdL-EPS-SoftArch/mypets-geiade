import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShelterCertificateService } from '../shelter-certificate.service';
import { User } from '../../login-basic/user';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import {ShelterCertificate} from "../shelter-certificate";

@Component({
  selector: 'app-shelter-certificate-list',
  templateUrl: './shelter-certificate-list.component.html'
})
export class ShelterCertificateListComponent implements OnInit {
  public shelterCertificates: ShelterCertificate[] = [];
  public pageSize = 5;
  public page = 1;
  public totalShelterCertificates = 0;

  constructor(
    public router: Router,
    private shelterCertificateService: ShelterCertificateService) {
  }

  ngOnInit(): void {
    this.shelterCertificateService.getPage({ pageParams:  { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
        (page: PagedResourceCollection<ShelterCertificate>) => {
          this.shelterCertificates = page.resources;
          this.totalShelterCertificates = page.totalElements;
        });
  }

  changePage(): void {
    this.shelterCertificateService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<ShelterCertificate>) => this.shelterCertificates = page.resources);
  }

  detail(shelterCertificate: ShelterCertificate): void {
    this.router.navigate(['shelter-certificate', shelterCertificate.id]);
  }
}
