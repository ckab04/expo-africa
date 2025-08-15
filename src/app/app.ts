import { AfterViewInit, Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AdminButtonComponent } from "./components/admin-button/admin-button.component";
import { AosService } from "./services/aos.service";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    NavigationComponent,
    FooterComponent,
    AdminButtonComponent,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App implements AfterViewInit {
  protected readonly title = signal("expo_africa");
  constructor(private aosService: AosService) {}
  ngAfterViewInit(): void {
    this.aosService.refresh();
  }
}
