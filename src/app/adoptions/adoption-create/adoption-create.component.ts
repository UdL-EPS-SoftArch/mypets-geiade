import { Component, OnInit } from '@angular/core';
import { Adoption } from '../adoption';
import { Router } from '@angular/router';
import { AdoptionService } from '../adoption.service';

@Component({
  selector: 'app-adoption-add',
  templateUrl: './adoption-create.component.html',
})
export class AdoptionCreateComponent implements OnInit{
  public adoption: Adoption;
  public date: Date;

  constructor(private router: Router,
              private adoptionService: AdoptionService) {
  }
  ngOnInit(): void {
    this.adoption = new Adoption();
  }

  onSubmit(): void {
    this.adoptionService.createResource({body: this.adoption}).subscribe(
      (adoption:Adoption) => this.router.navigate([adoption.uri])
    );
  }
}
