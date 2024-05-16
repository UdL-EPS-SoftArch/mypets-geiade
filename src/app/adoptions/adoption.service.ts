import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Adoption } from "./adoption"

@Injectable({providedIn: 'root'})
export class AdoptionService extends HateoasResourceOperation<Adoption> {

  constructor() {
    super(Adoption);
  }

  public findById(query: string): Observable<ResourceCollection<Adoption>> {
    return this.searchCollection('findById', { params: { text: query } });
  }
}

