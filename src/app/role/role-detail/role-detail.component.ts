import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../roleService'; // Asegúrate de que la ruta sea correcta
import { Role } from '../role';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html'
})
export class RoleDetailComponent implements OnInit {
  public role: Role = new Role();

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.roleService.getResource(id).subscribe(
      role => {
        this.role = role;
      }
    );
  }

  getCurrentRole(): Role {
    return this.roleService.getCurrentRole();
  }
}
