import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DogService} from "../dog.service";
import {Dog} from "../dog";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-dog-create',
  templateUrl: './dog-create.component.html',
  styleUrls: ['./dog-create.component.css']
})
export class DogCreateComponent implements OnInit{

  closeResult = '';
  public isModalSaved: boolean = false;
  public dogs: Dog[] = [];
  public dog: Dog;
  public dogForm: FormGroup;

  constructor(
    private router: Router,
    private dogService: DogService,
  ) {}

  ngOnInit(): void {
    this.dog = new Dog();
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
    this.loadDogList();
  }

  loadDogList() {
    this.dogService
      .getPage({
        sort: { name: 'ASC' },
      })
      .subscribe((dogs: PagedResourceCollection<Dog>) => {
        this.dogs = dogs.resources.sort((a, b) =>
          a.chip.localeCompare(b.chip)
        );
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
    this.dog.adopted = false;
    this.dogService
      .createResource({ body: this.dog })
      .subscribe((dog: Dog) => {
        const uri = (dog as any).uri;
        this.router.navigate([uri]).then();
      });
  }

}
