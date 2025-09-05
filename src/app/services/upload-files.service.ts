import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable, Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UploadFilesService {
  constructor(private http: HttpClient) {}

  uploadUrl = "http://localhost:8085/expoafrica/upload-file";

  uploadSingleFile(formData: FormData): Observable<any> {
    return this.http.post(this.uploadUrl, formData, {
      reportProgress: true,
      observe: "events",
    });
  }
}
