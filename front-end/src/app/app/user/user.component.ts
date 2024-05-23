import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserModalComponent} from "./user-modal/user-modal.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: any;
  userId!: number;
  isModalOpen = false;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  createUserModal(): void {
    if (this.isModalOpen) {
      return;
    }

    this.isModalOpen = true;
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        console.log('User created successfully', result);
      }
    });
  }

  onGetUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: response => {
          this.user = response;
          console.log('User fetched:', response);
        },
        error: error => {
        console.error('Error fetching user:', error);
        }
      });
    } else {
      console.error('User ID is required');
    }
  }
}
