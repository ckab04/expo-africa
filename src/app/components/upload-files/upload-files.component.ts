import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-upload-files",
  imports: [MatIconModule],
  templateUrl: "./upload-files.component.html",
  styleUrl: "./upload-files.component.css",
})
export class UploadFilesComponent {
  fileName = "";
  onFileSelected($event: any) {
    console.log("File uploaded");
  }
}
