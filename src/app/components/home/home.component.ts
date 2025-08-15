import { Component } from "@angular/core";
import { AboutComponent } from "../about/about.component";
import { ExpoProgramComponent } from "../expo-program/expo-program.component";
import { TicketsComponent } from "../tickets/tickets.component";
import { GalleryComponent } from "../gallery/gallery.component";
import { RegistrationComponent } from "../registration/registration.component";
import { PartnersComponent } from "../partners/partners.component";
import { AosDirective } from "../../directives/aos.directive";

@Component({
  selector: "app-home",
  imports: [
    AboutComponent,
    ExpoProgramComponent,
    TicketsComponent,
    GalleryComponent,
    RegistrationComponent,
    PartnersComponent,
    AosDirective,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
