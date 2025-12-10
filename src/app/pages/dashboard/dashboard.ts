import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { QueueItem, Policy } from './dashboard.models';
import { QUEUE_SECTIONS, ACTIONS, ACCOUNTS_ACTIONS } from './dashboard.constants';
import { DashboardService } from './dashboard.service';
import { filterPolicies, sortByName, groupByLob } from './dashboard.utils';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ScrollingModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [DashboardService],
})
export class DashboardComponent {
  queueData: QueueItem[] = [];
  policiesData: Policy[] = [];
  queueDataBackup: QueueItem[] = [];
  currentContent: string = '';
  searchTerm: string = '';
  filteredPoliciesData: Policy[] = [];
  openedQueueMenuId: number | null = null;
  openedMenuId: number | null = null;
  menuPosition = { top: 0, left: 0 };
  queue = QUEUE_SECTIONS;
  actions = ACTIONS;
  accounts = ACCOUNTS_ACTIONS;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.loadQueue().subscribe((data) => (this.queueData = data));
    this.dashboardService.loadPolicies().subscribe((data) => {
      this.policiesData = data;
      this.filteredPoliciesData = [...data];
    });
  }

  editItem(item: QueueItem) {
    console.log('Edit', item);
  }

  deleteItem(item: QueueItem) {
    this.queueData = this.queueData.filter((q) => q.id !== item.id);
  }

  editPolicy(policy: Policy) {
    console.log('Edit Policy', policy);
  }

  deletePolicy(policy: Policy) {
    this.policiesData = this.policiesData.filter((p) => p.id !== policy.id);
    this.filteredPoliciesData = this.filteredPoliciesData.filter((p) => p.id !== policy.id);
  }

  setContent(section: string) {
    this.currentContent = section;

    let allQueue = this.queueDataBackup;
    if (section === 'assigned') {
      this.queueData = allQueue;
    } else if (section === 'review') {
      this.queueData = allQueue.filter((item) => item.account === 'Pending review');
    } else if (section === 'referrals') {
      this.queueData = allQueue.filter((item) => item.account === 'New');
    }
  }

  toggleMenu(id: number) {
    this.openedMenuId = this.openedMenuId === id ? null : id;
  }

  toggleQueueMenu(id: number) {
    this.openedQueueMenuId = this.openedQueueMenuId === id ? null : id;
  }

  filterPolicies() {
    this.filteredPoliciesData = filterPolicies(this.policiesData, this.searchTerm);
  }

  setAccounts(section: string) {
    switch (section) {
      case 'filter':
        this.filteredPoliciesData = [...this.policiesData];
        break;
      case 'sort':
        this.filteredPoliciesData = sortByName(this.policiesData);
        break;
      case 'group':
        this.filteredPoliciesData = groupByLob(this.policiesData);
        break;
      case 'new':
        break;
      default:
        this.filteredPoliciesData = [...this.policiesData];
        break;
    }
  }
}
