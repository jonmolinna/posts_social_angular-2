import { Component, inject } from '@angular/core';
import { UserService } from '../../services/users.services';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../components/forms/input/input.component';
import { ValidationErrorPipe } from '../../pipe/validation_error_input.pipe';
import { userInterface } from '../../interface/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    RouterModule,
    ValidationErrorPipe,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  initialForm: FormGroup;
  loading: boolean = false;
  errors: Array<string> = [];
  disabledButton: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.initialForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(27),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z][A-Za-z0-9_]{5,20}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.disabledButton = true;
    const form = this.initialForm.value;

    this.userService.addUser(form).subscribe({
      next: (user: userInterface) => {
        this.loading = false;
        this.disabledButton = false;
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.disabledButton = false;

        if (error.status === 400) {
          this.errors = error.error.message;
        } else {
          this.errors = ['Error en el servidor'];
        }
      },
    });

    this.initialForm.reset();
  }
}
