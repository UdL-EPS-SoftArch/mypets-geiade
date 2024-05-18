import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import {Pet} from "./pet";

// We don't make pet available directly, we will inject the Cat and Dog services which extend this one.
// This is correct since in the API the Cat 
export class PetService<T extends Pet> extends HateoasResourceOperation<T> {

  constructor(resourceType: { new (): T }) {
    super(resourceType);
  }

  public findByChip(query: string): Observable<ResourceCollection<T>> {
    return this.searchCollection('findByChip', { params: { text: query } });
  }

  public findByName(query: string): Observable<ResourceCollection<T>> {
    return this.searchCollection('findByName', { params: { text: query } });
  }
}
