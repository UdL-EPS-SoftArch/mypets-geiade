import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import {User} from "../login-basic/user";

@HateoasResource('adoptions')
export class Adoption extends Resource {
  localDateTime: Date;
  id: string;
  pet: string;
  user: User;
  uri: string;



  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
