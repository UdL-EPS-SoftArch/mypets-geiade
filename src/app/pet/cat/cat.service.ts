import { Injectable } from "@angular/core";
import { PetService } from "../pet.service";
import { Cat } from "./cat";

@Injectable({providedIn: 'root'})
export class CatService extends PetService<Cat> {

    constructor() {
        super(Cat);
    }

}