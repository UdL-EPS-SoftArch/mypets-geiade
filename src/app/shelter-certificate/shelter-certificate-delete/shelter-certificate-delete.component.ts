import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShelterCertificateService} from "../shelter-certificate.service";
import {ShelterCertificate} from "../shelter-certificate";

@Component({
  selector: 'app-shelter-certificate-delete',
  templateUrl: './shelter-certificate-delete.component.html',
})
export class ShelterCertificateDeleteComponent implements OnInit {
  idShelter: string;
  shelterCertificate: ShelterCertificate;

  constructor(
    private router: Router,
    private shelterCertificateService: ShelterCertificateService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.idShelter = this.route.snapshot.paramMap.get('id');
  }

  delete() {
    this.shelterCertificateService.getResource(this.idShelter).subscribe((shelterCertificaate: ShelterCertificate) => {
      this.shelterCertificate = shelterCertificaate;
      this.shelterCertificateService
        .patchResource(this.shelterCertificate)
        .subscribe((patchedShelter: ShelterCertificate) => {
          this.shelterCertificateService.deleteResourceById(patchedShelter.id).subscribe({
            next: (e) => {
              this.router.navigateByUrl('/shelter-certificate');
            },
            error: (err) => {
            },
          });
        });
    });
  }
}
