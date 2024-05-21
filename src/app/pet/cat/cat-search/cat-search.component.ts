import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Cat } from '../cat';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.component.html'
})

export class CatSearchComponent {
  @Output() emitResults: EventEmitter<Cat> = new EventEmitter();
  searchFailed = false;
  searching = false;

  constructor(private catService: CatService) {
  }

  autocomplete: OperatorFunction<string, readonly Cat[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.catService.findByIdContaining(term).pipe(
          map((collection: ResourceCollection<Cat>) => collection.resources),
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
    this.emitResults.emit(item as Cat);
  }
}
