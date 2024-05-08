import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import {User} from "../login-basic/user";

@HateoasResource('users')
export class Adoptions extends Resource {
  localDateTime: Date;
  id: string;
  pet: string;
  user: User;



  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
