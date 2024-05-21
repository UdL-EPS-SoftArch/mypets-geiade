import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {ScheduleService} from "../schedule.service";
import {Schedule} from "../schedule";

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html'
})
export class ScheduleDetailComponent implements OnInit {
  public schedule: Schedule = new Schedule();

  constructor(private route: ActivatedRoute,
              private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.scheduleService.getResource(id).subscribe(
      schedule => {
        this.schedule = schedule;
      });
  }

}
