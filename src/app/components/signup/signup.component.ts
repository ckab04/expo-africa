import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-signup",
  imports: [FormsModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  user = { email: "", password: "", role: "" };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.signUp(this.user).subscribe({
      next: (res) => {
        //alert("User registered! ");
        console.log(res);
      },
      error: (err) => console.log("Error: " + err.error),
    });
  }
}
