import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('pets')
export class Pet extends Resource {

    uri: string;
    chip: string;
    name: string;
    dateOfBirth: Date;
    isAdopted: boolean;
    colour: string;
    size: number;
    sex: string;
    race: string;
    isDangerous: boolean;

    constructor(values: object = {}) {
        super();
        Object.assign(this as any, values);
    }

    public get id(): string {
        let uriArray = this.uri.split('/');
        return uriArray.pop();
    }

}