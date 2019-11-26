import { Observable } from "rxjs";
import { of } from "rxjs";
import { VERSION } from "../version";

export class HealthService {
  constructor() {}
  private getHealthData(): any {
    return {
      status: "UP",
      version: VERSION,
      services: {
      }
    };
  }

  public check(): Observable<any> {
    return of(this.getHealthData());
  }
}
