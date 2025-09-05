import { Component, Inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GalleryImage } from "../gallery/gallery.component";

@Component({
  selector: "app-image-dialog",
  imports: [],
  templateUrl: "./image-dialog.component.html",
  styleUrl: "./image-dialog.component.css",
})
export class ImageDialogComponent {
  images: string[];
  currentIndex: number;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { images: GalleryImage[]; index: number },
  ) {
    this.images = data.images.map((p) => p.src);
    this.currentIndex = data.index;
    console.log("Sent images : ", this.images);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  close() {
    this.dialogRef.close();
  }
}
