import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatService } from '../cat.service';
import { Cat } from '../cat';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html'
})
export class CatDetailComponent implements OnInit {
  public cat: Cat = new Cat();

  constructor(private route: ActivatedRoute,
              private catService: CatService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.catService.getResource(id).subscribe(
      cat => {
        this.cat = cat;
      });
  }

}
