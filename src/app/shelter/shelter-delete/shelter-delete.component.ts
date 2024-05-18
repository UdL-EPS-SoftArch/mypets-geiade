import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Shelter} from "../shelter";
import {ShelterService} from "../shelter.service";

@Component({
  selector: 'app-shelter-delete',
  templateUrl: './shelter-delete.component.html',
})
export class ShelterDeleteComponent implements OnInit {
  idShelter: string;
  shelter: Shelter;
  constructor(
    private router: Router,
    private shelterService: ShelterService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.idShelter = this.route.snapshot.paramMap.get('id');
  }
  delete() {
    this.shelterService.getResource(this.idShelter).subscribe((shelter: Shelter) => {
      this.shelter = shelter;
      this.shelterService
        .patchResource(this.shelter)
        .subscribe((patchedShelter: Shelter) => {
          this.shelterService.deleteResourceById(patchedShelter.id).subscribe({
            next: (e) => {
              this.router.navigateByUrl('/shelters');
            },
            error: (err) => {
            },
          });
        });
    });
  }
}
