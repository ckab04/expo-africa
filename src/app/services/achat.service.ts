import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AchatBillet } from "../datatypes/achat.interface";
import { catchError, map, Observable, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AchatService {
  constructor(private http: HttpClient) {}

  private achatUrl = "https://vps744712.ovh.net/expoafrica/achat";
  //private achatUrl = "http://localhost:8085/expoafrica/achat";
  //private tousLesAchats = "http://localhost:8085/expoafrica/achat";

  saveAchat(achatBillet: AchatBillet): Observable<string> {
    //console.log("Sending to:", this.achatUrl);
    //console.log("Payload:", achatBillet);
    return this.http
      .post(this.achatUrl, achatBillet, {
        responseType: "text",
      })
      .pipe(
        tap((response) => console.log("Server response:", response)),
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("HTTP Error:", error);

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error("Client error:", error.error.message);
    } else {
      // Server-side error
      console.error(
        `Server returned code ${error.status}, body was:`,
        error.error,
      );
    }

    return throwError(() => "Une erreur est survenue. Veuillez réessayer.");
  }

  getAllAchats(): Observable<AchatBillet[]> {
    return this.http.get<AchatBillet[]>(this.achatUrl + "/tous-les-achats");
  }
}
