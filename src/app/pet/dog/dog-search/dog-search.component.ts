import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Dog } from '../dog';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-dog-search',
  templateUrl: './dog-search.component.html'
})

export class DogSearchComponent {
  @Output() emitResults: EventEmitter<Dog> = new EventEmitter();
  searchFailed = false;
  searching = false;

  constructor(private dogService: DogService) {
  }

  autocomplete: OperatorFunction<string, readonly Dog[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.dogService.findByIdContaining(term).pipe(
          map((collection: ResourceCollection<Dog>) => collection.resources),
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
    this.emitResults.emit(item as Dog);
  }
}
