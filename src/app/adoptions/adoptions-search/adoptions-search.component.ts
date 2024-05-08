import { Component, EventEmitter, Output } from '@angular/core';
import { AdoptionsService } from '../adoptions.service';
import { Adoptions } from '../adoptions';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
  selector: 'app-propagator-search',
  templateUrl: './propagator-search.component.html',
  standalone: true,
  imports: []
})

export class AdoptionsSearchComponent {
  @Output() emitResults: EventEmitter<Adoptions> = new EventEmitter();
  searchFailed = false;
  searching = false;

  constructor(private AdoptionsService: AdoptionsService) {
  }

  autocomplete: OperatorFunction<string, readonly Adoptions[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.AdoptionsService.findById(term).pipe(
          map((collection: ResourceCollection<Adoptions>) => collection.resources),
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
    this.emitResults.emit(item as Adoptions);
  }
}
