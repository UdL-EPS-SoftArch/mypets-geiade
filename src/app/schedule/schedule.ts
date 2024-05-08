import {HateoasResource, Resource} from '@lagoshny/ngx-hateoas-client';

@HateoasResource('schedules')
export class Schedule extends Resource {
  id: number;
  startTime: Date;
  endTime: Date;
  shelter: string;
  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
