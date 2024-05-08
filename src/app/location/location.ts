import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('location')
export class Location extends Resource {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  province: string;
  city: string;
  postalcode:number;
  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
