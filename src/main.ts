import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { App } from "./app/app";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 120,
});
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
