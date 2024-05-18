import { Injectable } from "@angular/core";
import { PetService } from "../pet.service";
import { Dog } from "./dog";

@Injectable({providedIn: 'root'})
export class DogService extends PetService<Dog> {

    constructor() {
        super(Dog);
    }

}