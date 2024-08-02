import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    LayoutModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'app-ngrx';

  @ViewChild(MatSidenav, { static: true }) sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((result) => {
      if (result.matches) {
        this.sidenav.mode = 'over'; // ocultar
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side'; // mostrar
        this.sidenav.open();
      }
    });
  }
}
