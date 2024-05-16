import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('shelterCertificates')
export class ShelterCertificate extends Resource {
  uri: string;
  name: string;
  expirationDate: Date;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  public get id(): string {
    console.log(this)
    console.log(this.uri)
    let uriArray = this.uri.split('/');
    return uriArray.pop();
  }
}
