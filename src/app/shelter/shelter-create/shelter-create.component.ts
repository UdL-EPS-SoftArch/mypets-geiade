import {Component, OnInit} from '@angular/core';
import {User} from "../../login-basic/user";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserService} from "../../user/user.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {ShelterService} from "../shelter.service";
import {Shelter} from "../shelter";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";

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

  get name() {
    return this.shelterForm.get('name');
  }

  get email() {
    return this.shelterForm.get('email');
  }

  onSubmit(): void {
    this.shelterService
      .createResource({ body: this.shelter })
      .subscribe((shelter: Shelter) => {
        const uri = (shelter as any).uri;
        this.router.navigate([uri]).then();
      });
  }

}
