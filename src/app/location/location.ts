import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('locations')
export class Location extends Resource {
  address: string;
  latitude: number;
  longitude: number;
  province: string;
  city: string;
  postalCode:number;
  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  public get id(): string {
    let uriArray = this.uri.split('/');
    return uriArray.pop();
  }
}
