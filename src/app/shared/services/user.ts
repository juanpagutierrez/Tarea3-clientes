import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../types/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint = 'users';

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/${this.endpoint}`);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/${this.endpoint}/${id}`);
  }

  getCleanUser(): User {
    return {
      name: '',
      email: ''
    };
  }
}