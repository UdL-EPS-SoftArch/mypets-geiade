import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Cat } from '../cat';
import { CatService } from '../cat.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-cat-edit',
  templateUrl: './cat-edit.component.html'
})
export class CatEditComponent implements OnInit {
  public cat: Cat = new Cat();
  public catForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private catService: CatService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.catService.getResource(id).subscribe(
      (cat: Cat) => this.cat = cat );
      this.catForm = new FormGroup({
        chip: new FormControl(this.cat.chip, [
          Validators.required,
        ]),
        name: new FormControl(this.cat.name, [
          Validators.required,
        ]),
        dateOfBirth: new FormControl(this.cat.dateOfBirth, [
          Validators.required,
          this.dateValidator(),
        ]),
        colour: new FormControl(this.cat.colour, [
          Validators.required,
          this.colourValidator(),
        ]),
        size: new FormControl(this.cat.size, [
          Validators.required,
          this.numberValidator(),
        ]),
        sex: new FormControl(this.cat.sex, [
          Validators.required,
          this.sexValidator(),
        ]),
        race: new FormControl(this.cat.race, [
          Validators.required,
        ]),
        dangerous: new FormControl(this.cat.dangerous, []),
        meowingLevel: new FormControl(this.cat.meowingLevel, [
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
    return this.catForm.get('chip');
  }

  get name() {
    return this.catForm.get('name');
  }

  get dateOfBirth() {
    return this.catForm.get('dateOfBirth');
  }

  get adopted() {
    return this.catForm.get('adopted');
  }

  get colour() {
    return this.catForm.get('colour');
  }

  get size() {
    return this.catForm.get('size');
  }

  get sex() {
    return this.catForm.get('sex');
  }

  get race() {
    return this.catForm.get('race');
  }

  get dangerous() {
    return this.catForm.get('dangerous');
  }

  get meowingLevel() {
    return this.catForm.get('meowingLevel');
  }


  onSubmit(): void {
    this.catService.patchResource(this.cat).subscribe(
      (patchedCat: Cat) => {
          this.router.navigate(['cats', patchedCat.id]);
      });
  }

}
