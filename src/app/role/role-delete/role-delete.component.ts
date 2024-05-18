import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../roleService';
import { Role } from '../role';

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html'
})
export class RoleDeleteComponent implements OnInit {
  public role: Role = new Role();
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.roleService.getResource(this.id).subscribe(
      role => this.role = role
    );
  }

  delete(): void {
    this.roleService.deleteResource(this.role).subscribe(
      () => {
        this.router.navigate(['/role']);
      }
    );
  }
}
