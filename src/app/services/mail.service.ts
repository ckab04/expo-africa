import { Injectable } from "@angular/core";
import { Ticket } from "../components/tickets/tickets.component";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MailService {
  private mailUrl = "https://vps744712.ovh.net/expoafrica/send-email";
  //registrationUrl = "https://vps744712.ovh.net/inscrits/inscription";
  //private mailUrl = "http://localhost:8085/expoafrica/send-email";

  constructor(private http: HttpClient) {}

  sendEmail(data: Email) {
    console.log("Sending email...");
    this.http
      .post(this.mailUrl, data, {
        responseType: "text",
      })
      .subscribe(() => console.log("Mail sent"));
  }
}

export interface Email {
  to: string;
  subject: string;
  body: string;
}
