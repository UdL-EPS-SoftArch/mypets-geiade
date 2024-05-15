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

  public findById(id: string): Observable<ResourceCollection<Location>> {
    return this.searchCollection("findById", { params: { id: id } })
  }

  public findByPostalCode(postalCode: string): Observable<ResourceCollection<Location>> {
    return this.searchCollection("findByPostalCode", { params: { postalCode: postalCode } })
  }

  public findByProvince(province: string): Observable<ResourceCollection<Location>> {
    return this.searchCollection("findByProvince", { params: { province: province } })
  }



  public findByCity(city: string): Observable<ResourceCollection<Location>> {
    return this.searchCollection("findByCity", { params: { city: city } })
  }
  public findByAddress(address: string): Observable<ResourceCollection<Location>> {
    return this.searchCollection("findByAddress", { params: { address: address } })
  }

}



