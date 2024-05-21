import { Injectable } from "@angular/core";
import { PetService } from "../pet.service";
import { Dog } from "./dog";
import { Observable, forkJoin, map } from "rxjs";
import { ResourceCollection } from "@lagoshny/ngx-hateoas-client";

@Injectable({providedIn: 'root'})
export class DogService extends PetService<Dog> {

    constructor() {
        super(Dog);
    }

    public findByIdContaining(query: string): Observable<ResourceCollection<Dog>> {
        let res1 = this.searchCollection('findByName', { params: { name: query } });
        let res2 = this.searchCollection('findByChip', { params: { chip: query } });
        return forkJoin([res1, res2]).pipe(
            map(([result1, result2]) => {
                const combinedResources = [...result1.resources, ...result2.resources];
                return {
                  ...result1,
                  resources: combinedResources,
                } as ResourceCollection<Dog>;
              })
        );;
    }

}