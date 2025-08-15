import { Component, OnInit } from "@angular/core";
import { User, UsersService } from "../../services/users.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-inscrits-list",
  imports: [CommonModule],
  templateUrl: "./inscrits-list.component.html",
  styleUrl: "./inscrits-list.component.css",
})
export class InscritsListComponent implements OnInit {
  users: User[] = [];
  lastDocId: string | null = "";
  pageSize = 2;
  loading = false;
  noMoreData = false;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // loadUsers() {
  //   if (this.loading || this.noMoreData) return;
  //   this.loading = true;

  //   this.userService.getUsers(this.pageSize, this.lastDocId).subscribe({
  //     next: (res) => {
  //       if (res.users.length === 0) {
  //         this.noMoreData = true;
  //       } else {
  //         this.users = [...this.users, ...res.users];
  //         this.lastDocId = res.lastDocId;
  //       }
  //       console.log("users : ", this.users);
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error("Error loading users", err);
  //       this.loading = false;
  //     },
  //   });
  // }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        //this.users = [...this.users, ...res.users];
        //console.log("users : ", this.users);
      },
      error: (err) => {
        console.error("Error ", err);
        //this.loading = false;
      },
    });
  }
}
