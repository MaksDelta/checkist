import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard';
import { AccountsComponent } from '../accounts/accounts';

@Component({
  selector: 'app-home',
  imports: [CommonModule, DashboardComponent, AccountsComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class HomeComponent {
  currentContent: string = '';

  sections = [
    { key: 'dashboard', label: 'Dashboard', icon: 'assets/images/home.svg' },
    { key: 'accounts', label: 'Accounts', icon: 'assets/images/coin.svg' },
    { key: 'brokers', label: 'Brokers', icon: 'assets/images/users.svg' },
    { key: 'submissions', label: 'Submissions', icon: 'assets/images/file.svg' },
    { key: 'organizations', label: 'Organizations', icon: 'assets/images/buildings.svg' },
    { key: 'goals', label: 'Goals & Rules', icon: 'assets/images/flag.svg' },
    { key: 'admin', label: 'Admin', icon: 'assets/images/key.svg' },
  ];

  setContent(section: string) {
    this.currentContent = section;
  }
}
