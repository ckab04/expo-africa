import { Component } from "@angular/core";
import { AosDirective } from "../../directives/aos.directive";

@Component({
  selector: "app-tickets",
  imports: [AosDirective],
  templateUrl: "./tickets.component.html",
  styleUrl: "./tickets.component.css",
})
export class TicketsComponent {
  tickets: Ticket[] = [
    {
      icon: "⭐",
      type: "Standard",
      price: "25 000 FCFA",
      features: ["Accès à toutes les expositions et animations"],
      cardStyle: "bg-gray-50 rounded-lg p-8 text-center",
    },
    // More ticket types...
    {
      icon: "👑",
      type: "VIP",
      price: "50 000 FCFA",
      features: ["Accès VIP + cocktail + places réservées"],
      cardStyle: "bg-orange-50 border-2 border-orange-200 rounded-lg p-8 ",
    },
    {
      icon: "💎",
      type: "VVP",
      price: "100 000 FCFA",
      features: ["Accès VVP + dîner gala + rencontre artistes"],
      cardStyle: "bg-purple-50 border-2 border-purple-200 rounded-lg p-8",
    },
  ];
}

interface Ticket {
  icon?: string;
  type: string;
  price: string;
  features: string[];
  popular?: boolean;
  cardStyle?: string;
}
