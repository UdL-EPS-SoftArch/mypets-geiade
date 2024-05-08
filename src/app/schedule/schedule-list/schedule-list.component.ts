import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import {Schedule} from "../schedule";

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html'
})
export class ScheduleListComponent implements OnInit {
  public schedules: Schedule[] = [];
  public pageSize = 5;
  public page = 1;
  public totalSchedules = 0;

  constructor(
    public router: Router,
    private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.scheduleService.getPage({ pageParams:  { size: this.pageSize }, sort: { id: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Schedule>) => {
        this.schedules = page.resources;
        this.totalSchedules = page.totalElements;
      });
  }

  changePage(): void {
    this.scheduleService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Schedule>) => this.schedules = page.resources);
  }

  detail(schedule: Schedule): void {
    this.router.navigate(['schedules', schedule.id]);
  }
}
