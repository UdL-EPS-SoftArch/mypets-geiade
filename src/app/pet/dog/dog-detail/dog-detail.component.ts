import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DogService } from '../dog.service';
import { Dog } from '../dog';

@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html'
})
export class DogDetailComponent implements OnInit {
  public dog: Dog = new Dog();

  constructor(private route: ActivatedRoute,
              private dogService: DogService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dogService.getResource(id).subscribe(
      dog => {
        this.dog = dog;
      });
  }

}
