import { Component } from "@angular/core";
import { AosDirective } from "../../directives/aos.directive";

@Component({
  selector: "app-expo-program",
  imports: [AosDirective],
  templateUrl: "./expo-program.component.html",
  styleUrl: "./expo-program.component.css",
})
export class ExpoProgramComponent {
  program: ProgramItem[] = [
    {
      day: "Vendredi",
      date: "24 Octobre 2025",
      events: [
        {
          time: "09:00",
          title: "Ouverture officielle",
          description: "Cérémonie d'ouverture avec les officiels",
        },
        {
          time: "14:00",
          title: "Conférence sur l'art africain",
          description: "Cérémonie d'ouverture avec les officiels",
        },
        {
          time: "18:00",
          title: "Défilé de mode",
          description: "Cérémonie d'ouverture avec les officiels",
        },
      ],
    },
    // More days...
    {
      day: "Samedi",
      date: "25 Octobre 2025",
      events: [
        {
          time: "10:00",
          title: "Karaoké live",
          description: "Cérémonie d'ouverture avec les officiels",
        },
        // More events...
        {
          time: "15:00",
          title: "Animation musicale",
          description: "Cérémonie d'ouverture avec les officiels",
        },
        {
          time: "20:00",
          title: "Danse traditionnelle",
          description: "Cérémonie d'ouverture avec les officiels",
        },
      ],
    },

    {
      day: "Dimanche",
      date: "26 Octobre 2025",
      events: [
        {
          time: "11:00",
          title: "Remise des prix",
          description: "Cérémonie d'ouverture avec les officiels",
        },
        {
          time: "16:00",
          title: "Clôture musicale",
          description: "Cérémonie d'ouverture avec les officiels",
        },
      ],
    },
  ];
}

interface ProgramItem {
  day: string;
  date: string;
  events: {
    time: string;
    title: string;
    description: string;
  }[];
}
