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
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'accounts', label: 'Accounts' },
    { key: 'brokers', label: 'Brokers' },
    { key: 'submissions', label: 'Submissions', },
    { key: 'organizations', label: 'Organizations' },
    { key: 'goals', label: 'Goals & Rules' },
    { key: 'admin', label: 'Admin' },
  ];

  setContent(section: string) {
    this.currentContent = section;
  }
}
