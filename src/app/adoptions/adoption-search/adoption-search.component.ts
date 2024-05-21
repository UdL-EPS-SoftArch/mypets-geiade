import { Component, EventEmitter, Output } from '@angular/core';
import { AdoptionService } from '../adoption.service';
import { Adoption } from '../adoption';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
  selector: 'app-adoption-search',
  templateUrl: './adoption-search.component.html'
})

export class AdoptionSearchComponent {
  @Output() emitResults: EventEmitter<Adoption> = new EventEmitter();
  searchFailed = false;
  searching = false;

  constructor(private AdoptionService: AdoptionService) {
  }

  autocomplete: OperatorFunction<string, readonly Adoption[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.AdoptionService.findById(term).pipe(
          map((collection: ResourceCollection<Adoption>) => collection.resources),
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
    this.emitResults.emit(item as Adoption);
  }
}
