import { Component, EventEmitter, Output } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from '../location';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';

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


  select(item: any): void {
    this.emitResults.emit(item as Location);
  }
}
