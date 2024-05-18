import { HateoasResource } from "@lagoshny/ngx-hateoas-client";
import { Pet } from '../pet';

@HateoasResource('dogs')
export class Dog extends Pet {

    meowingLevel: number;

}