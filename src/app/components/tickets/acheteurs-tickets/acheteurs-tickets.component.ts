import { Component } from "@angular/core";
import { AchatBillet } from "../../../datatypes/achat.interface";
import { AchatService } from "../../../services/achat.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-acheteurs-tickets",
  imports: [CommonModule],
  templateUrl: "./acheteurs-tickets.component.html",
  styleUrl: "./acheteurs-tickets.component.css",
})
export class AcheteursTicketsComponent {
  listAchats: AchatBillet[] = [];

  constructor(private achatBillets: AchatService) {}

  ngOnInit() {
    this.achatBillets.getAllAchats().subscribe((data) => {
      console.log("Liste achats : ", data);

      this.listAchats = data;
      console.log("Liste achats FROM THE LIST  : ", this.listAchats);
    });
  }
}
