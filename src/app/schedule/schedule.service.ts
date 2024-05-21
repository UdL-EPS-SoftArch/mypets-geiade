import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HateoasResourceOperation, ResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Schedule } from "./schedule";

@Injectable({providedIn: "root"})
export class ScheduleService extends HateoasResourceOperation<Schedule> {

  constructor() {
    super(Schedule);
  }

  public findById(id: string): Observable<ResourceCollection<Schedule>> {
    return this.searchCollection("findByCreatedBy", { params: { id: id } })
  }

  public findByStartTime(startTime: string): Observable<ResourceCollection<Schedule>> {
    return this.searchCollection("findByStartTime", { params: { startTime: startTime } })
  }

  public findByEndTime(endTime: string): Observable<ResourceCollection<Schedule>> {
    return this.searchCollection("findByEndTime", { params: { endTime: endTime } })
  }

  public findByShelter(shelter: string): Observable<ResourceCollection<Schedule>> {
    return this.searchCollection("findByShelter", { params: { shelter: shelter } })
  }
}
