import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user';
import { User as IUser } from '../../../shared/types/user';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.scss'
})
export class UpdateUser implements OnInit {

  userId: string = '';
  user: IUser;
  error: boolean = false;
  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      terms: [false, [Validators.requiredTrue]],
    });
    this.user = this.getCleanUser();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('user id?', params['id']);
      this.userId = params['id'];
      this.getUser();
    }); 
  }

  getCleanUser(): IUser {
    return {
      name: '',
      email: ''
    };
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.user = response; 
        this.error = false;
        this.form.patchValue(response); 
      },
      error: () => {
        this.error = true;
      },
    });
  }

  doOnSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Datos a enviar:', formData);
      alert('Form Submitted!');
    } else {
      console.log('Formulario inválido');
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}