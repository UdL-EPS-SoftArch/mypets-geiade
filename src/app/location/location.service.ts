import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HateoasResourceOperation, ResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Location } from "./location";

@Injectable({providedIn: "root"})
export class LocationService extends HateoasResourceOperation<Location> {

  constructor() {
    super(Location);
  }

  public findLocationByAddressAndProvinceAndCityAndPostalCode(address:string, province:string, city:string, postalcode:number): Observable<ResourceCollection<Location>> {
    const params = {
      address: address,
      province: province,
      city: city,
      postalcode: postalcode.toString()
    };
    return this.searchCollection('findLocationByAddressAndProvinceAndCityAndPostalCode', {params});

  }
}
