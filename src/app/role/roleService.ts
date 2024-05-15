import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Role } from "./role"; // Asegúrate de importar la clase Role correctamente

@Injectable({ providedIn: 'root' })
export class RoleService extends HateoasResourceOperation<Role> {

  constructor() {
    super(Role);
  }

  public findByName(query: string): Observable<ResourceCollection<Role>> {
    return this.searchCollection('findByName', { params: { text: query } });
  }
}
