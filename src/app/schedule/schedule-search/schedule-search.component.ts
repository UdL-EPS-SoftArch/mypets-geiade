import { Component, EventEmitter, Output } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import {Schedule} from "../schedule";

@Component({
  selector: 'app-schedule-search',
  templateUrl: './schedule-search.component.html'
})

export class ScheduleSearchComponent {
  @Output() emitResults: EventEmitter<Schedule> = new EventEmitter();
  searchFailed = false;
  searching = false;

  constructor(private scheduleService: ScheduleService) {
  }

  autocomplete: OperatorFunction<string, readonly Schedule[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.scheduleService.findById(term).pipe(
          map((collection: ResourceCollection<Schedule>) => collection.resources),
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false )
    )

  select(item: any): void {
    this.emitResults.emit(item as Schedule);
  }
}
