import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DashboardComponent } from './pages/dashboard/dashboard'
import { AccountsComponent } from './pages/accounts/accounts';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'account/:id', component: AccountsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
