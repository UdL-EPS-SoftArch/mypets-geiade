import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('roles')
export class Role extends Resource {
  name: string;
  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  public get id (): String {
    let uriArray =this.uri.split('/');
    return uriArray.pop();
}
}
