import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RegistrationService } from "../../services/registration.service";
import { phoneNumberValidator } from "../../utils/phone.validator";
import { AosDirective } from "../../directives/aos.directive";

import { formatDate } from "@angular/common";

@Component({
  selector: "app-registration",
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AosDirective],
  templateUrl: "./registration.component.html",
  styleUrl: "./registration.component.css",
})
export class RegistrationComponent {
  utilisateurInscrit: RegistrationData = {
    fullName: "",
    phoneNumber: "",
    statut: "",
    dateInscription: new Date(),
  };

  formData = {
    fullname: "",
    email: "",
    phone: "",
    ticketType: "",
  };

  showSuccess = false;
  showError = false;

  registrationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private registration: RegistrationService,
  ) {
    this.registrationForm = this.fb.group({
      fullName: ["", Validators.required],
      phoneNumber: ["", [Validators.required, phoneNumberValidator()]],
      statut: [""],
    });
  }

  onSubmit() {
    console.log("Submit form registration");
    // Implement form submission logic
    if (this.registrationForm.valid) {
      this.utilisateurInscrit.fullName = this.registrationForm.value.fullName;
      this.utilisateurInscrit.phoneNumber =
        this.registrationForm.value.phoneNumber;
      this.utilisateurInscrit.statut = this.registrationForm.value.statut;
      // this.utilisateurInscrit.dateInscription = formatDate(
      //   new Date(),
      //   "dd/MM/yyyy",
      //   "fr-FR",
      // );
      this.showSuccess = true;
      this.registration.newInscription(this.utilisateurInscrit);
      console.log("Nouvelle inscription : ", this.utilisateurInscrit);
      // this.registrationForm.reset();
      //this.registrationForm.get("statut")?.setValue("");
      this.registrationForm.reset({ statut: "" });
    } else {
      console.error("Form is not valid");
      this.showError = true;
    }
  }
}

export interface RegistrationData {
  fullName: string;
  phoneNumber: string;
  statut: string;
  dateInscription: Date;
}
