import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdoptionsService } from '../adoptions.service';
import { Adoptions } from '../adoptions';

@Component({
  selector: 'app-adoptions-detail',
  templateUrl: './adoptions-detail.component.html',
  standalone: true,
  imports: []
})
export class AdoptionsDetailComponent implements OnInit {
  public adoptions: Adoptions = new Adoptions();
  public adoptionsId: string;

  constructor(private route: ActivatedRoute,
              private adoptionsService: AdoptionsService) {
  }

  ngOnInit(): void {
    this.adoptionsId = this.route.snapshot.paramMap.get('id');
    this.adoptionsService.getResource(this.adoptionsId).subscribe(
      adoptions => {
        this.adoptions = adoptions;
      });
  }
}
