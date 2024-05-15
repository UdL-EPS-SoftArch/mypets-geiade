import { Component, OnInit } from '@angular/core';
import { Role } from "../role"; // Asegúrate de importar la clase Role correctamente
import { Router } from "@angular/router";
import { RoleService } from "../roleService"; // Asegúrate de importar el servicio de roles correctamente
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";

@Component({
    selector: 'app-role-create',
    templateUrl: './role-create.component.html',
})
export class RoleCreateComponent implements OnInit {

    closeResult = '';
    public isModalSaved: boolean = false;
    public roles: Role[] = [];
    public role: Role;
    public roleNameInput: string = '';
    public roleForm: FormGroup;

    constructor(
        private router: Router,
        private roleService: RoleService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.role = new Role();
        this.roleForm = new FormGroup({
            name: new FormControl(this.role.name, [
                Validators.required,
            ]),
        });
        this.loadRoleList();
    }

    loadRoleList() {
        this.roleService
            .getPage({
                sort: { name: 'ASC' },
            })
            .subscribe((roles: PagedResourceCollection<Role>) => {
                this.roles = roles.resources.sort((a, b) =>
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

    get name() {
        return this.roleForm.get('name');
    }

    onSubmit(): void {
        this.roleService
            .createResource({ body: this.role })
            .subscribe((role: Role) => {
                const uri = (role as any).uri;
                this.router.navigate([uri]).then();
            });
    }
}
