import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface QueueItem {
  id: number;
  type: string;
  priority: string;
  account: string;
  due: string;
}

export interface Policy {
  id: number;
  accountId: number;
  name: string;
  lob: string;
  line?: string;
  broker?: string;
  premium: number;
  ratedPremium?: number;
  lossRatio?: number;
  appetite?: string;
  status: string;
  triage?: string;
  winability?: string;
  effective?: string;
  expiration?: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  queueData: QueueItem[] = [];
  policiesData: Policy[] = [];
  currentContent: string = '';
  openedMenuId: number | null = null;
  menuPosition = { top: 0, left: 0 };

  queue = [
    { key: 'assigned', label: 'Assignet to me' },
    { key: 'review', label: 'Pending review' },
    { key: 'referrals', label: 'Referrals' },
  ];

  actions = [
    { key: 'submision', label: 'New Submision' },
    { key: 'quote', label: 'Quote builder' },
    { key: 'models', label: 'Risks Models' },
    { key: 'upload', label: 'Documents Upload' },
  ];

  accounts = [
    { key: 'filter', label: 'Filter' },
    { key: 'sort', label: 'Sort' },
    { key: 'group', label: 'Group' },
    { key: 'new', label: '+New' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadQueue();
    this.loadPolicies();
  }

  loadQueue() {
    this.http.get<any>('assets/data/seed.json').subscribe({
      next: (data) => {
        this.queueData = data.workQueue;
      },
      error: (err) => console.error('Cannot load JSON', err),
    });
  }

  loadPolicies() {
    this.http.get<any>('assets/data/seed.json').subscribe({
      next: (data) => {
        this.policiesData = data.policies;
      },
      error: (err) => console.error('Cannot load JSON', err),
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
  }

  setContent(section: string) {
    this.currentContent = section;
  }

  toggleMenu(id: number) {
    this.openedMenuId = this.openedMenuId === id ? null : id;
  }
}