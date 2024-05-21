import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LocationService} from "../location.service";
import {Location} from "../location";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
})
export class LocationCreateComponent implements OnInit{

  closeResult = '';
  public isModalSaved: boolean = false;
  public locations: Location[] = [];
  public location: Location;
  public commonNameInput: string = '';
  public commonEmailsList: any = [];
  public locationForm: FormGroup;

  constructor(
    private router: Router,
    private locationService: LocationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.location = new Location();
    this.locationForm = new FormGroup({
      address: new FormControl(this.location.address),
      city: new FormControl(this.location.city),
      province: new FormControl(this.location.province),
      postalCode: new FormControl(this.location.postalCode),
    });
    this.loadLocationList();
  }

  loadLocationList() {
    this.locationService
      .getPage({
        sort: { address: 'ASC' },
      })
      .subscribe((locations: PagedResourceCollection<Location>) => {
        this.locations = locations.resources.sort((a, b) =>
          a.address.localeCompare(b.address)
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
    return this.locationForm.get('name');
  }

  get email() {
    return this.locationForm.get('email');
  }

  get mobile() {
    return this.locationForm.get('mobile');
  }

  onSubmit(): void {
    this.location.latitude = 555;
    this.location.longitude = 555;
    this.locationService
      .createResource({ body: this.location })
      .subscribe((location: Location) => {
        console.log(location);
        const uri = (location as any).uri;
        this.router.navigate([uri]).then();
      });
  }

}
