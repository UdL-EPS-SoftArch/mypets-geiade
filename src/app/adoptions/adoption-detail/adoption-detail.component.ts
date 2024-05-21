import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdoptionService } from '../adoption.service';
import { Adoption } from '../adoption';

@Component({
  selector: 'app-adoption-detail',
  templateUrl: './adoption-detail.component.html'
})
export class AdoptionDetailComponent implements OnInit {
  public adoption: Adoption = new Adoption();
  public adoptionId: string;

  constructor(private route: ActivatedRoute,
              private adoptionService: AdoptionService) {
  }

  ngOnInit(): void {
    this.adoptionId = this.route.snapshot.paramMap.get('id');
    this.adoptionService.getResource(this.adoptionId).subscribe(
      adoption => {
        this.adoption = adoption;
      });
  }
}
