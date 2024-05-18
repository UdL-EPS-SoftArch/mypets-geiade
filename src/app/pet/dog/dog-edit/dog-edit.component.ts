import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Dog } from '../dog';
import { DogService } from '../dog.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-dog-edit',
  templateUrl: './dog-edit.component.html'
})
export class DogEditComponent implements OnInit {
  public dog: Dog = new Dog();
  public dogForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dogService: DogService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dogService.getResource(id).subscribe(
      (dog: Dog) => this.dog = dog );
      this.dogForm = new FormGroup({
        chip: new FormControl(this.dog.chip, [
          Validators.required,
        ]),
        name: new FormControl(this.dog.name, [
          Validators.required,
        ]),
        dateOfBirth: new FormControl(this.dog.dateOfBirth, [
          Validators.required,
          this.dateValidator(),
        ]),
        colour: new FormControl(this.dog.colour, [
          Validators.required,
          this.colourValidator(),
        ]),
        size: new FormControl(this.dog.size, [
          Validators.required,
          this.numberValidator(),
        ]),
        sex: new FormControl(this.dog.sex, [
          Validators.required,
          this.sexValidator(),
        ]),
        race: new FormControl(this.dog.race, [
          Validators.required,
        ]),
        dangerous: new FormControl(this.dog.dangerous, []),
        barkingLevel: new FormControl(this.dog.barkingLevel, [
          Validators.required,
        ]),
      });
  }

  
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateValue = control.value;
      const isValidDate = !isNaN(Date.parse(dateValue));
      return isValidDate ? null : { invalidDate: { value: control.value } };
    };
  }

  colourValidator(): ValidatorFn {
    const hexColorRe: RegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const isValidColour = hexColorRe.test(control.value);
      return isValidColour ? null : { invalidColour: { value: control.value } };
    };
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const numberValue = control.value;
      const isValidNumber = !isNaN(numberValue) && numberValue > 0;
      return isValidNumber ? null : { invalidNumber: { value: control.value } };
    };
  }

  sexValidator(): ValidatorFn {
    const validSexes = ['male', 'female'];
    return (control: AbstractControl): ValidationErrors | null => {
      const isValidSex = control.value !== null && control.value !== undefined && validSexes.includes(control.value.toLowerCase());
      return isValidSex ? null : { invalidSex: { value: control.value } };
    };
  }

  get chip() {
    return this.dogForm.get('chip');
  }

  get name() {
    return this.dogForm.get('name');
  }

  get dateOfBirth() {
    return this.dogForm.get('dateOfBirth');
  }

  get adopted() {
    return this.dogForm.get('adopted');
  }

  get colour() {
    return this.dogForm.get('colour');
  }

  get size() {
    return this.dogForm.get('size');
  }

  get sex() {
    return this.dogForm.get('sex');
  }

  get race() {
    return this.dogForm.get('race');
  }

  get dangerous() {
    return this.dogForm.get('dangerous');
  }

  get barkingLevel() {
    return this.dogForm.get('barkingLevel');
  }


  onSubmit(): void {
    this.dogService.patchResource(this.dog).subscribe(
      (patchedDog: Dog) => {
          this.router.navigate(['dogs', patchedDog.id]);
      });
  }

}
