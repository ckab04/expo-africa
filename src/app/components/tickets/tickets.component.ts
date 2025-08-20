import { Component } from "@angular/core";
import { AosDirective } from "../../directives/aos.directive";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../services/helper.service";
import { StorageService } from "../../services/storage.service";
import { TicketConfirmationDialogComponent } from "./ticket-confirmation-dialog/ticket-confirmation-dialog.component";

@Component({
  selector: "app-tickets",
  imports: [AosDirective, FormsModule, ReactiveFormsModule],
  templateUrl: "./tickets.component.html",
  styleUrl: "./tickets.component.css",
})
export class TicketsComponent {
  whatsappNumber = "+242050109403"; // Replace with actual Cameroon number
  showForm = false;
  selectedTicket: Ticket | null = null;

  //ticketForm: FormGroup;
  ticketForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private helperService: HelperService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.ticketForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9\+\-\s]+$/)]],
      email: ["", [Validators.email]],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }
  tickets: Ticket[] = [
    {
      icon: "⭐",
      type: "Standard",
      price: "25 000 FCFA",
      numericPrice: 25000,
      features: ["Accès à toutes les expositions et animations"],
      cardStyle: "bg-gray-50 rounded-lg p-8 text-center",
      whatsappTemplate: `Je souhaite réserver un billet STANDARD pour 25 000 FCFA.

      Nom complet: {name}
      Téléphone: {phone}
      Email: {email}
      Quantité: {quantity}

      Merci de me contacter pour finaliser la réservation.`,
    },
    // More ticket types...
    {
      icon: "👑",
      type: "VIP",
      price: "50 000 FCFA",
      numericPrice: 50000,
      features: ["Accès VIP + cocktail + places réservées"],
      cardStyle: "bg-orange-50 border-2 border-orange-200 rounded-lg p-8 ",
      whatsappTemplate: `Je souhaite réserver un billet VIP pour 50 000 FCFA.

      Nom complet: {name}
      Téléphone: {phone}
      Email: {email}
      Quantité: {quantity}

      Je suis intéressé(e) par les avantages VIP. Merci de me recontacter.`,
    },
    {
      icon: "💎",
      type: "VVP",
      price: "100 000 FCFA",
      numericPrice: 100000,
      features: ["Accès VVP + dîner gala + rencontre artistes"],
      cardStyle: "bg-purple-50 border-2 border-purple-200 rounded-lg p-8",
      whatsappTemplate: `Je souhaite réserver un billet VVP pour 100 000 FCFA.

      Nom complet: {name}
      Téléphone: {phone}
      Email: {email}
      Quantité: {quantity}

      Pourriez-vous m'indiquer les modalités de paiement pour ce billet premium ?`,
    },
  ];

  selectTicket(ticket: Ticket): void {
    console.log("Selected ticket: ", ticket);
    this.selectedTicket = ticket;
    this.showForm = true;
    this.ticketForm.reset({ quantity: 1 });
  }

  getWhatsAppUrl(): string {
    if (!this.selectedTicket || !this.ticketForm.valid) return "#";

    const formData = this.ticketForm.value;
    let message = this.selectedTicket.whatsappTemplate;

    message = message
      .replace("{name}", formData.name || "")
      .replace("{phone}", formData.phone || "")
      .replace("{email}", formData.email || "")
      .replace("{quantity}", formData.quantity?.toString() || "1");
    console.log(
      `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`,
    );
    const encodedMessage = encodeURIComponent(message);

    //return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
    return `https://api.whatsapp.com/send?phone=${this.whatsappNumber}&text=${encodedMessage}`;
  }

  confirmPurchase(): void {
    if (this.ticketForm.invalid || !this.selectedTicket) return;

    this.saveReservation();
    const whatsappUrl = this.getWhatsAppUrl();
    console.log("Redirecting to WhatsApp:", whatsappUrl);

    // Mobile-compatible redirect
    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 100);

    // const dialogRef = this.dialog.open(TicketConfirmationDialogComponent, {
    //   width: "500px",
    //   data: {
    //     ticket: this.selectedTicket,
    //     formData: this.ticketForm.value,
    //     whatsappLink: this.getWhatsAppUrl(),
    //   },
    // });

    // dialogRef.afterClosed().subscribe((confirmed) => {
    //   if (confirmed) {
    //     this.saveReservation();
    //     //this.helperService.openExternalUrl(this.getWhatsAppUrl());
    //     setTimeout(() => {
    //       window.location.href = this.getWhatsAppUrl();
    //     }, 100);
    //   }
    // });
  }

  private saveReservation(): void {
    const formData = this.ticketForm.value;
    const reservations =
      this.storageService.getData<Reservation[]>("reservations") || [];

    const reservationData: Reservation = {
      id: this.helperService.generateId(),
      client: formData.name,
      telephone: formData.phone,
      email: formData.email,
      type: this.selectedTicket!.type,
      quantity: formData.quantity,
      prix: this.selectedTicket!.numericPrice * (formData.quantity || 1),
      date: new Date().toISOString(),
      status: "pending",
    };

    reservations.push(reservationData);
    this.storageService.saveData("reservations", reservations);

    this.helperService.showNotification(
      `Réservation pour ${formData.quantity} billet(s) ${this.selectedTicket!.type} enregistrée !`,
      "success",
    );

    this.showForm = false;
    this.selectedTicket = null;
  }
}

export interface Ticket {
  icon?: string;
  type: string;
  price: string;
  numericPrice: number;
  features: string[];
  popular?: boolean;
  cardStyle?: string;
  whatsappTemplate: string;
}

interface Reservation {
  id: string;
  client: string;
  telephone: string;
  email?: string;
  type: string;
  quantity: number;
  prix: number;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
}
