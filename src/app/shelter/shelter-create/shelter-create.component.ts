import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ShelterService} from "../shelter.service";
import {Shelter} from "../shelter";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-shelter-create',
  templateUrl: './shelter-create.component.html',
})
export class ShelterCreateComponent implements OnInit{

  closeResult = '';
  public isModalSaved: boolean = false;
  public shelters: Shelter[] = [];
  public shelter: Shelter;
  public commonNameInput: string = '';
  public commonEmailsList: any = [];
  public shelterForm: FormGroup;

  constructor(
    private router: Router,
    private shelterService: ShelterService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.shelter = new Shelter();
    this.shelterForm = new FormGroup({
      name: new FormControl(this.shelter.name, [
        Validators.required,
      ]),
      email: new FormControl(this.shelter.email, [
        Validators.required,
        this.emailValidator(),
      ]),
      mobile: new FormControl(this.shelter.mobile, [
        Validators.required,
        this.mobileValidator(),
      ]),
    });
    this.loadShelterList();
  }

  loadShelterList() {
    this.shelterService
      .getPage({
        sort: { name: 'ASC' },
      })
      .subscribe((shelters: PagedResourceCollection<Shelter>) => {
        this.shelters = shelters.resources.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveAndClose(modal: any) {
    this.isModalSaved = true;
    modal.close('Save click');
  }

  emailValidator(): ValidatorFn {
    const nameRe: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = !nameRe.test(control.value);
      return invalid ? { invalidName: { value: control.value } } : null;
    };
  }

  mobileValidator(): ValidatorFn {
    const nameRe: RegExp = /^$|[0-9]{11}/;
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = !nameRe.test(control.value);
      return invalid ? { invalidName: { value: control.value } } : null;
    };

  }

  get name() {
    return this.shelterForm.get('name');
  }

  get email() {
    return this.shelterForm.get('email');
  }

  get mobile() {
    return this.shelterForm.get('mobile');
  }

  onSubmit(): void {
    this.shelter.createdAt = new Date();
    this.shelter.updatedAt = new Date();
    this.shelterService
      .createResource({ body: this.shelter })
      .subscribe((shelter: Shelter) => {
        const uri = (shelter as any).uri;
        this.router.navigate([uri]).then();
      });
  }

}
