import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {ShelterCertificate} from "../shelter-certificate";
import {ShelterCertificateService} from "../shelter-certificate.service";

@Component({
  selector: 'app-shelter-certificate-detail',
  templateUrl: './shelter-certificate-detail.component.html'
})
export class ShelterCertificateDetailComponent implements OnInit {
  public shelterCertificate: ShelterCertificate = new ShelterCertificate();

  constructor(private route: ActivatedRoute,
              private shelterCertificateService: ShelterCertificateService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.shelterCertificateService.getResource(id).subscribe(
      shelterCertificate => {
        this.shelterCertificate = shelterCertificate;
      });
  }
}
