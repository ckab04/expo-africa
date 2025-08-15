import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-button",
  imports: [],
  templateUrl: "./admin-button.component.html",
  styleUrl: "./admin-button.component.css",
})
export class AdminButtonComponent {
  constructor(private router: Router) {}

  goToConnextion() {
    this.router.navigateByUrl("/login");
  }
}
