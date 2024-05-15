import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adoptions } from '../adoptions';
import { AdoptionsService } from '../adoptions.service';

@Component({
  selector: 'app-adoptions-delete',
  templateUrl: './adoptions.add.component.html'
})
export class AdoptionsDeleteComponent implements OnInit {
  public adoptions: Adoptions = new Adoptions();
  public adoptionsId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adoptionsService: AdoptionsService) {
  }

  ngOnInit(): void {
    this.adoptionsId = this.route.snapshot.paramMap.get('id');
    this.adoptionsService.getResource(this.adoptionsId).subscribe(
      adoptions => this.adoptions = adoptions);
  }

  delete(): void {
    this.adoptionsService.deleteResource(this.adoptions).subscribe(
      () => {
        this.router.navigate(['id']);
      });
  }
}
