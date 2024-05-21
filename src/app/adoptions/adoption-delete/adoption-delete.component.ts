import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adoption } from '../adoption';
import { AdoptionService } from '../adoption.service';

@Component({
  selector: 'app-adoption-delete',
  templateUrl: './adoption.delete.component.html'
})
export class AdoptionDeleteComponent implements OnInit {
  public adoption: Adoption = new Adoption();
  public adoptionId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adoptionService: AdoptionService) {
  }

  ngOnInit(): void {
    this.adoptionId = this.route.snapshot.paramMap.get('id');
    this.adoptionService.getResource(this.adoptionId).subscribe(
      adoption => this.adoption = adoption);
  }

  delete(): void {
    this.adoptionService.deleteResource(this.adoption).subscribe(
      () => {
        this.router.navigate(['id']);
      });
  }
}
