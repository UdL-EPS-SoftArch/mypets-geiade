import {HateoasResource, Resource} from '@lagoshny/ngx-hateoas-client';

@HateoasResource('schedules')
export class Schedule extends Resource {
  id: number;
  startTime: moment.Moment;
  endTime: moment.Moment;
  //shelter: string;
  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
