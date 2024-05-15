import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('roles')
export class Role extends Resource {
  id: number;
  name: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
