import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  AfterViewInit,
} from "@angular/core";
import AOS from "aos";

@Directive({
  selector: "[appAos]",
})
export class AosDirective implements OnInit, AfterViewInit {
  @Input() appAos: string = "fade-up";
  @Input() aosDelay: number = 0;
  @Input() aosDuration: number = 800;
  @Input() aosOnce: boolean = true;

  private static initialized = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  // Initialize AOS if not already initialized
  ngAfterViewInit() {
    if (!AosDirective.initialized) {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 120,
      });
      AosDirective.initialized = true;
    }
    AOS.refresh();
  }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, "data-aos", this.appAos);
    this.renderer.setAttribute(
      this.el.nativeElement,
      "data-aos-delay",
      this.aosDelay.toString(),
    );
    this.renderer.setAttribute(
      this.el.nativeElement,
      "data-aos-duration",
      this.aosDuration.toString(),
    );
    if (this.aosOnce) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        "data-aos-once",
        "true",
      );
    }
  }
}
