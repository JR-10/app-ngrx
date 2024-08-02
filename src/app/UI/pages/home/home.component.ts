import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private router: Router
  ) { }


  onRedirectPost() {
    this.router.navigate(['/post']);
  }

  onRedirectPothos() {
    this.router.navigate(['/photos']);
  }
}
