import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { User } from '../../login-basic/user';
import { Location } from '@angular/common';
import {ShelterCertificateService} from "../shelter-certificate.service";
import {ShelterCertificate} from "../shelter-certificate";

@Component({
  selector: 'app-shelter-certificate-create',
  templateUrl: './shelter-certificate-create.component.html'
})
export class ShelterCertificateCreateComponent implements OnInit {
  public shelterCertificate: ShelterCertificate;

  constructor(private router: Router,
              private location: Location,
              private shelterCertificateService: ShelterCertificateService) {
  }

  ngOnInit(): void {
    this.shelterCertificate = new ShelterCertificate();
  }

  onSubmit(): void {
    this.shelterCertificate.expirationDate = new Date(this.shelterCertificate.expirationDate);
    this.shelterCertificateService.createResource({ body: this.shelterCertificate }).subscribe(
      (shelterCertificate: ShelterCertificate) => {
        const uri = (shelterCertificate as any).uri;
        this.router.navigate(['/shelter-certificate', shelterCertificate.id]).then()
      }
    )
  }

  onCancel(): void {
    this.location.back();
  }
}
