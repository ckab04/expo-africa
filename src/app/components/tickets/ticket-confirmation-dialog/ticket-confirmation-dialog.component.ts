import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Ticket } from "../tickets.component";
import { CommonModule, DecimalPipe } from "@angular/common";
import { MailService } from "../../../services/mail.service";
import { HelperService } from "../../../services/helper.service";
import { AchatBillet } from "../../../datatypes/achat.interface";
import { AchatService } from "../../../services/achat.service";

@Component({
  selector: "app-ticket-confirmation-dialog",
  imports: [CommonModule],
  templateUrl: "./ticket-confirmation-dialog.component.html",
  styleUrl: "./ticket-confirmation-dialog.component.css",
})
export class TicketConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticket: Ticket;
      formData: any;
      whatsappLink: string;
    },
    private mailService: MailService,
    private helperService: HelperService,
    private achatService: AchatService,
  ) {}

  buyer: AchatBillet = {
    id: "",
    name: "",
    phone: "",
    email: "",
    type: "",
    quantity: 0,
    datePurchase: new Date(),
  };

  calculateTotal(): number {
    return this.data.ticket.numericPrice * this.data.formData.quantity;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    const genId = this.helperService.generateId();
    const mailRequest = {
      to: "dev.ckap@gmail.com",
      subject: `Test Ticket #${genId} -  ${this.data.formData.name}`,
      body: `
      <h2>Détails ticket:</h2>
      <p>Type: ${this.data.ticket.type}</p>
      <p>Texte: ${this.data.ticket.textTemplate}</p>
      <p>Quantité: ${this.data.formData.quantity}</p>

       <h2>Détails personne: </h2>
      <p>Nom: ${this.data.formData.name}</p>
      <p>Phone: ${this.data.formData.phone}</p>
      <p>Email: ${this.data.formData.email}</p>
      `,
    };
    this.buyer.id = genId;
    this.buyer.name = this.data.formData.name;
    this.buyer.type = this.data.ticket.type;
    this.buyer.phone = this.data.formData.phone;
    if (this.data.formData.email != null) {
      this.buyer.email = this.data.formData.email;
    } else {
      this.buyer.email = "";
    }
    this.buyer.quantity = this.data.formData.quantity;
    this.achatService.saveAchat(this.buyer).subscribe({
      next: (response) => {
        console.log("Server response:", response);
        // Handle success
      },
      error: (error) => {
        console.error("Error occurred:", error);
        // Handle error
      },
      complete: () => {
        console.log("Request completed");
      },
    });
    console.log("Saved a buyer");
    this.mailService.sendEmail(mailRequest);
    this.helperService.showNotification("Succès !!!");
    this.dialogRef.close(true);
  }
}
