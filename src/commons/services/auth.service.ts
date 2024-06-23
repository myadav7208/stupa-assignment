import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface loginData {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: loginData) {
    return this.http.post('https://fakestoreapi.com/auth/login', data);
  }

  /**
  * Check if a token is present in session storage; if it is, consider the user logged in.
  * If not, consider the user logged out. However, in a real-world scenario,
  * we also validate whether the stored token has expired or not
  */
  isLoggedIn() {
    let token = sessionStorage.getItem('token');
    return !!token;
  }

  logout() {
    sessionStorage.removeItem('token');
  }

}
