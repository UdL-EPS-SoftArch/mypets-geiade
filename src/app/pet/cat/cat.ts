import { HateoasResource } from "@lagoshny/ngx-hateoas-client";
import { Pet } from '../pet';

@HateoasResource('cats')
export class Cat extends Pet {

    meowingLevel: number;

}