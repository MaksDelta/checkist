import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { QueueItem, Policy } from './dashboard.models';
import { QUEUE_SECTIONS, ACTIONS, ACCOUNTS_ACTIONS, GOALS } from './dashboard.constants';
import { DashboardService } from './dashboard.service';
import { filterPolicies, sortByName, groupByLob } from './dashboard.utils';
import { EditModalComponent } from './edit-modal/edit-modal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ScrollingModule, FormsModule, EditModalComponent],
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
  stackedGoals = GOALS;
  selectedItem: any = null;
  isModalVisible = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.loadQueue().subscribe((data) => (this.queueData = data));
    this.dashboardService.loadPolicies().subscribe((data) => {
      this.policiesData = data;
      this.filteredPoliciesData = [...data];
    });
  }

  deleteItem(item: QueueItem) {
    this.queueData = this.queueData.filter((q) => q.id !== item.id);
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
        this.addNewPolicy();
        break;
      default:
        this.filteredPoliciesData = [...this.policiesData];
        break;
    }
  }

  addNewPolicy() {
    this.selectedItem = {};
    this.isModalVisible = true;
  }

  editItem(item: QueueItem) {
    this.selectedItem = item;
    this.isModalVisible = true;
  }

  editPolicy(policy: Policy) {
    this.selectedItem = policy;
    this.isModalVisible = true;
  }

  onModalSave(updated: any) {
    if ('due' in updated) {
      const index = this.queueData.findIndex((q) => q.id === updated.id);
      if (index !== -1) {
        this.queueData[index] = updated;
      } else {
        updated.id = this.queueData.length ? Math.max(...this.queueData.map((q) => q.id)) + 1 : 1;
        this.queueData.push(updated);
      }
    } else {
      const index = this.policiesData.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        this.policiesData[index] = updated;
      } else {
        updated.id = this.policiesData.length
          ? Math.max(...this.policiesData.map((p) => p.id)) + 1
          : 1;
        this.policiesData.push(updated);
      }
      this.filteredPoliciesData = [...this.policiesData];
    }

    this.isModalVisible = false;
  }

  onModalClose() {
    this.isModalVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.menu-wrapper')) {
      this.openedMenuId = null;
    }

    if (!target.closest('.queue .menu-wrapper')) {
      this.openedQueueMenuId = null;
    }
  }

  trackByGoal(index: number, item: any) {
    return item.name;
  }

  trackByPart(index: number, item: any) {
    return item.color + item.value;
  }
}
