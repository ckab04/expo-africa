import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AdminConnexionComponent } from "./components/admin-connexion/admin-connexion.component";
import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { AdminVueComponent } from "./components/admin-vue/admin-vue.component";

export const routes: Routes = [
  {
    path: "login",
    component: AdminConnexionComponent,
    //canActivate: [AdminGuard, AuthGuard],
  },
  {
    path: "dashboard",
    component: AdminVueComponent,
    canActivate: [AdminGuard, AuthGuard],
  },
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "**", redirectTo: "" },
];
