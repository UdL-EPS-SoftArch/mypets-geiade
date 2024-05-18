import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import {Shelter} from "./shelter";

@Injectable({providedIn: 'root'})
export class ShelterService extends HateoasResourceOperation<Shelter> {

  constructor() {
    super(Shelter);
  }

  public findByName(query: string): Observable<ResourceCollection<Shelter>> {
    return this.searchCollection('findByName', { params: { text: query } });
  }
}
