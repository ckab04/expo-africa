import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Ticket } from "../tickets.component";
import { CommonModule, DecimalPipe } from "@angular/common";

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
  ) {}

  calculateTotal(): number {
    return this.data.ticket.numericPrice * this.data.formData.quantity;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
