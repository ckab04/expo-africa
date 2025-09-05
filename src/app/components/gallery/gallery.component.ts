import { Component } from "@angular/core";
import { AosDirective } from "../../directives/aos.directive";
import { MatDialog } from "@angular/material/dialog";
import { ImageDialogComponent } from "../image-dialog/image-dialog.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-gallery",
  imports: [AosDirective, CommonModule],
  templateUrl: "./gallery.component.html",
  styleUrl: "./gallery.component.css",
})
export class GalleryComponent {
  galleryImages: GalleryImage[] = [
    {
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      alt: "Art africain",
      caption: "Exposition d'art traditionnel",
    },
    {
      src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      alt: "EXPO AFRICA - Performance musicale",
      caption: "Exposition d'art traditionnel",
    },
    {
      src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop",
      alt: "Art africain",
      caption: "Exposition d'art traditionnel",
    },
    {
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      alt: "Art africain",
      caption: "Exposition d'art traditionnel",
    },
  ];

  constructor(private dialog: MatDialog) {}

  openImage(index: number) {
    this.dialog.open(ImageDialogComponent, {
      data: { images: this.galleryImages, index },
      panelClass: "custom-dialog",
      backdropClass: "custom-backdrop",
    });
  }
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}
