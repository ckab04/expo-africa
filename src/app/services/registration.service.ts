import { Injectable } from "@angular/core";
import { RegistrationData } from "../components/registration/registration.component";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  //registrationUrl = "http://localhost:8085/inscrits/inscription";
  registrationUrl = "https://vps744712.ovh.net:8085/inscrits/inscription";

  constructor(private http: HttpClient) {}

  newInscription(inscrit: RegistrationData) {
    console.log("Inscrit data: ", inscrit);
    this.http
      .post(this.registrationUrl, inscrit, {
        responseType: "text",
      })
      .subscribe(() => console.log("sent"));
  }
}
