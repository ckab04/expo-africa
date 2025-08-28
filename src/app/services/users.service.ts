import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  //private apiUrl = "http://localhost:8085/inscrits/tous-inscrits";
  private apiUrl = "https://vps744712.ovh.net/inscrits/tous-inscrits";

  constructor(private http: HttpClient) {}

  // getUsers(
  //   pageSize: number,
  //   lastDocId?: string | null,
  // ): Observable<PagedUsers> {
  //   let url = `${this.apiUrl}?pageSize=${pageSize}`;
  //   if (lastDocId) {
  //     url += `&lastDocId=${lastDocId}`;
  //   }
  //   return this.http.get<PagedUsers>(url);
  // }

  getUsers(): Observable<User[]> {
    let url = `${this.apiUrl}`;
    return this.http.get<User[]>(url);
  }
}

export interface User {
  fullName: string;
  phoneNumber: string;
  statut: string;
  dateInscription: Date;
}

export interface PagedUsers {
  users: User[];
  lastDocId: string | null;
}
