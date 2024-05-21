import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import {ShelterCertificate} from "./shelter-certificate";

@Injectable({providedIn: 'root'})
export class ShelterCertificateService extends HateoasResourceOperation<ShelterCertificate> {

  constructor() {
    super(ShelterCertificate);
  }

  public findByIdContaining(query: string): Observable<ResourceCollection<ShelterCertificate>> {
    return this.searchCollection('findById', { params: { text: query } });
  }
}
