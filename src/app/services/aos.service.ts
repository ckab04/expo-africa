import { Injectable, AfterViewInit } from "@angular/core";
import AOS from "aos";

@Injectable({
  providedIn: "root",
})
export class AosService implements AfterViewInit {
  private static initialized = false;
  constructor() {
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  ngAfterViewInit() {
    if (!AosService.initialized) {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 120,
        disable: window.innerWidth < 768,
      });
      AosService.initialized = true;
    }
    AOS.refresh();
  }

  refresh() {
    AOS.refresh();
  }

  private handleResize() {
    if (window.innerWidth < 768) {
      AOS.init({ disable: true });
    } else {
      AOS.init({ disable: false });
    }
  }
}
