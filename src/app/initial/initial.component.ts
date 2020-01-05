import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
@Injectable()
export class InitialComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.navigateToLogin();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
