import { Component, OnInit } from '@angular/core';
import { Role } from "../role"; // Asegúrate de importar la clase Role correctamente
import { Router } from "@angular/router";
import { RoleService } from "../roleService"; // Asegúrate de importar el servicio de roles correctamente
import { PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
})
export class RoleListComponent implements OnInit {
  public roles: Role[] = [];
  public pageSize = 5;
  public page = 1;
  public totalRoles = 0;
  constructor(
    public router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roleService
      .getPage({
        pageParams: { size: this.pageSize },
        sort: { name: 'ASC' },
      })
      .subscribe((page: PagedResourceCollection<Role>) => {
        this.roles = page.resources;
        console.log(this.roles);
        this.totalRoles = page.totalElements;
      });
  }

  changePage(): void {
    this.roleService
      .getPage({
        pageParams: { page: this.page - 1, size: this.pageSize },
        sort: { name: 'ASC' },
      })
      .subscribe(
        (page: PagedResourceCollection<Role>) => (this.roles = page.resources)
      );
  }
}

