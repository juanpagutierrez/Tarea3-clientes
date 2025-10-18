import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user';
import { User } from '../../shared/types/user';

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterOutlet, RouterModule], 
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {
  
  users: User[] = []; 
  isLoading: boolean = true; 

  constructor(private userService: UserService) {} 

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }
}