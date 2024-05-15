import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationBasicService} from 'src/app/login-basic/authentication-basic.service';
import {Schedule} from '../schedule';
import {ScheduleService} from '../schedule.service';
import {PagedResourceCollection} from '@lagoshny/ngx-hateoas-client';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-schedules-create',
  templateUrl: './schedule-create.component.html',
  //styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {

  public schedule: Schedule = new Schedule();
  public id: number;
  public startTime: Date;
  public endTime: Date;
  public shelter: string;
  public schedules: Schedule[] = [];
  public pageSize = 5;
  public page = 1;
  public totalSchedules = 0;
  public creationDate: Date
  public authserv: AuthenticationBasicService;
  public types: [];

  constructor(private router: Router,
              private authenticationService: AuthenticationBasicService,
              private scheduleService: ScheduleService,

              private http: HttpClient) { }

  ngOnInit(): void {
    this.creationDate = new Date();
    this.http.get<any>(`${environment.API}/profile/schedules`)
      .subscribe(data => {
        this.types = (data.alps.descriptor[0].descriptor[2].doc.value).split(',').sort();
      });

    this.scheduleService.getPage({ pageParams:  { size: this.pageSize }, sort: { id: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Schedule>) => {
        this.schedules = page.resources;
        this.totalSchedules = page.totalElements;
      });
  }

  onSubmit(): void {
    this.scheduleService.createResource({ body: this.schedule }).subscribe(
      (schedule:Schedule) => this.router.navigate([schedule.uri]));
  }


}
