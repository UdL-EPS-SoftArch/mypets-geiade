
import { Component, EventEmitter, Output } from '@angular/core';
import { LocationService } from '../location.service';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import {Location} from "../location";

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html'
})

export class LocationSearchComponent {
  @Output() emitResults: EventEmitter<Location> = new EventEmitter();
  searchFailed = false;
  searching = false;

  constructor(private locationService: LocationService) {
  }

  autocomplete: OperatorFunction<string, readonly Location[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.locationService.findById(term).pipe(
          map((collection: ResourceCollection<Location>) => collection.resources),
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
    this.emitResults.emit(item as Location);
  }
}
