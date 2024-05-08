import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Adoptions } from "./adoptions"

@Injectable({providedIn: 'root'})
export class AdoptionsService extends HateoasResourceOperation<Adoptions> {

  constructor() {
    super(Adoptions);
  }

  public findById(query: string): Observable<ResourceCollection<Adoptions>> {
    return this.searchCollection('findById', { params: { text: query } });
  }
}

