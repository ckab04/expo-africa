import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { UploadFilesService } from "../../services/upload-files.service";
import { finalize, Subscription } from "rxjs";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CommonModule } from "@angular/common";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-upload-files",
  imports: [MatIconModule, MatProgressBarModule, CommonModule],
  templateUrl: "./upload-files.component.html",
  styleUrl: "./upload-files.component.css",
})
export class UploadFilesComponent {
  constructor(private uploadFile: UploadFilesService) {}

  fileName = "";
  @Input()
  requiredFileType!: string;

  uploadSub!: Subscription;
  uploadProgress!: number;

  onFileSelected(event: Event) {
    const file = event.target as HTMLInputElement;

    if (file.files && file.files.length > 0) {
      this.fileName = file.name;
      const formData: any = new FormData();
      formData.append("thumbnail", file);
      const upload$ = this.uploadFile
        .uploadSingleFile(formData)
        .pipe(finalize(() => this.resetFileInput()));

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
      });
    }

    console.log("File uploaded");
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.resetFileInput();
  }

  resetFileInput(): void {
    // this.fileUpload.nativeElement.value = '';
    // this.fileName = null;
    this.uploadProgress = 0;
    this.uploadSub = Subscription.EMPTY;
  }
}
