import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dog } from '../dog';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog-delete',
  templateUrl: './dog-delete.component.html'
})
export class DogDeleteComponent implements OnInit {
  public dog: Dog = new Dog();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dogService: DogService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dogService.getResource(this.id).subscribe(
      dog => this.dog = dog);
  }

  delete(): void {
    this.dogService.deleteResource(this.dog).subscribe(
      () => {
        this.router.navigate(['dogs']);
      });
  }
}
