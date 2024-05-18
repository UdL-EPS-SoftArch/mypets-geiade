import { Injectable } from "@angular/core";
import { PetService } from "../pet.service";
import { Cat } from "./cat";
import { ResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable, forkJoin, map, merge, reduce } from "rxjs";

@Injectable({providedIn: 'root'})
export class CatService extends PetService<Cat> {

    constructor() {
        super(Cat);
    }

    public findByIdContaining(query: string): Observable<ResourceCollection<Cat>> {
        let res1 = this.searchCollection('findByName', { params: { name: query } });
        let res2 = this.searchCollection('findByChip', { params: { chip: query } });
        return forkJoin([res1, res2]).pipe(
            map(([result1, result2]) => {
                const combinedResources = [...result1.resources, ...result2.resources];
                return {
                  ...result1,
                  resources: combinedResources,
                } as ResourceCollection<Cat>;
              })
        );;
    }

}