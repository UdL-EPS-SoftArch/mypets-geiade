import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { User } from '../../login-basic/user';
import { Location } from '@angular/common';
import {ShelterCertificateService} from "../shelter-certificate.service";
import {ShelterCertificate} from "../shelter-certificate";

@Component({
  selector: 'app-user-register',
  templateUrl: './shelter-certificate-create.component.html'
})
export class ShelterCertificateCreateComponent implements OnInit {
  public shelterCertificate: ShelterCertificate;

  constructor(private router: Router,
              private location: Location,
              private shelterCertificateService: ShelterCertificateService,
              private authenticationBasicService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    this.shelterCertificate = new ShelterCertificate();
  }

  onSubmit(): void {
    // const payload = {
    //   ...this.shelterCertificate,
    //   expirationDate: new Date(this.shelterCertificate.expirationDate).toISOString()
    // };

    this.shelterCertificateService.createResource({ body: this.shelterCertificate }).subscribe(
      (shelterCertificate: ShelterCertificate) => {
        console.log("CREATED!!")
        this.router.navigate(['shelter-certificate', shelterCertificate.id]);
      }
    )
  }

  onCancel(): void {
    this.location.back();
  }
}
