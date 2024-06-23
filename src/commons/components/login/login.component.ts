import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/commons/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  @Output() closeModal = new EventEmitter();

  constructor(private readonly authService: AuthService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.form.status === 'VALID') {
      this.authService.login(this.form.getRawValue()).subscribe(
        (res: any) => {
          sessionStorage.setItem('token', res.token);
          this.closeModal.emit();
          alert('Loggen in successfully');

        },
        (error) => {
          alert(error.error);
        }
      )
    }
  }

}
