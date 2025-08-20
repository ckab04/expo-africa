import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Generate a unique ID
   */
  generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Show notification to user
   * @param message Notification message
   * @param type Type of notification (success, error, info)
   * @param duration Duration in milliseconds
   */
  showNotification(message: string, type: string = "success"): void {
    const notificationType = type || "success";

    this.snackBar.open(message, "Fermer", {
      duration: 5000,
      panelClass: [`notification-${notificationType}`],
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  /**
   * Open external URL
   * @param url URL to open
   * @param target Target window (_blank, _self)
   */
  openExternalUrl(url: string, target: string = "_blank"): void {
    try {
      window.open(url, target, "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening URL:", error);
      this.showNotification("Impossible d'ouvrir le lien", "error");
    }
  }

  /**
   * Format price in FCFA
   * @param amount Amount to format
   */
  formatPrice(amount: number): string {
    return (
      new Intl.NumberFormat("fr-FR", {
        style: "decimal",
        maximumFractionDigits: 0,
      }).format(amount) + " FCFA"
    );
  }

  /**
   * Validate phone number (Cameroon format)
   * @param phone Phone number to validate
   */
  validatePhoneNumber(phone: string): boolean {
    const regex = /^(?:(?:\+|00)242|242)?\s*[6-9]\d{8}$/;
    return regex.test(phone);
  }

  isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }
}
