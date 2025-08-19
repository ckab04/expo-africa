import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  //private authUrl = "http://localhost:8085/expoafrica/auth";
  private authUrl = "https://vps744712.ovh.net/expoafrica/auth";
  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<string> {
    return this.http.post(this.authUrl + "/signup", user, {
      responseType: "text",
    });
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post(
      this.authUrl + "/login",
      { email, password },
      { responseType: "text" },
    );
  }

  saveToken(token: string) {
    localStorage.setItem("jwtToken", token);
  }

  getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }

  logout() {
    localStorage.removeItem("jwtToken");
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    } catch (e) {
      return null;
    }
  }
}

interface User {
  email: string;
  password: string;
}
