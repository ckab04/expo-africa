import { Component } from "@angular/core";
import { InscritsListComponent } from "../inscrits-list/inscrits-list.component";

@Component({
  selector: "app-admin-vue",
  imports: [InscritsListComponent],
  templateUrl: "./admin-vue.component.html",
  styleUrl: "./admin-vue.component.css",
})
export class AdminVueComponent {}
