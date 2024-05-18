import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cat } from '../cat';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-cat-delete',
  templateUrl: './cat-delete.component.html'
})
export class CatDeleteComponent implements OnInit {
  public cat: Cat = new Cat();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private catService: CatService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.catService.getResource(this.id).subscribe(
      cat => this.cat = cat);
  }

  delete(): void {
    this.catService.deleteResource(this.cat).subscribe(
      () => {
        this.router.navigate(['cats']);
      });
  }
}
