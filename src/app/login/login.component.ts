import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthCookie } from '../AuthCookie/AuthCookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  cookie = new AuthCookie();
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.email !== '') {
      const body = JSON.stringify({username: this.email,
      password: this.password});
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      this.http.post<Auth>('https://api.youstory.io/auth_api/auth/login', body, {headers})
      .subscribe(data => {
        this.cookie.setAuth(data.result.token);
        this.router.navigate(['/create']);
      });
    }
  }
}
