import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { SignupComponent } from "../signup/signup.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-connexion",
  imports: [FormsModule],
  templateUrl: "./admin-connexion.component.html",
  styleUrl: "./admin-connexion.component.css",
})
export class AdminConnexionComponent {
  email = "";
  password = "";

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (token) => {
        this.authService.saveToken(token);
        //alert("User logged in successfully");
        this.router.navigateByUrl("/dashboard");
      },
      error: (err) => console.error("Login failed"),
    });
  }
}
