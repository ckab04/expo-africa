import { Component } from "@angular/core";
import { InscritsListComponent } from "../inscrits-list/inscrits-list.component";
import { MatTabsModule } from "@angular/material/tabs";
import { AchatBillet } from "../../datatypes/achat.interface";
import { AchatService } from "../../services/achat.service";
import { AcheteursTicketsComponent } from "../tickets/acheteurs-tickets/acheteurs-tickets.component";
import { FileUploadBusinessComponent } from "../file-upload-business/file-upload-business.component";

@Component({
  selector: "app-admin-vue",
  imports: [
    InscritsListComponent,
    MatTabsModule,
    AcheteursTicketsComponent,
    FileUploadBusinessComponent,
  ],
  templateUrl: "./admin-vue.component.html",
  styleUrl: "./admin-vue.component.css",
})
export class AdminVueComponent {
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
