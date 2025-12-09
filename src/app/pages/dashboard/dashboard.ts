import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface QueueItem {
  id: number;
  originator: string;
  clientLine: string;
  type: string;
  status: string;
  created: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  queueData: QueueItem[] = [];
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadQueue();
  }

  loadQueue() {
    this.http.get<QueueItem[]>('assets/data/queue.json').subscribe({
      next: (data) => {
        console.log('Queue loaded', data);
        this.queueData = data;
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

  setContent(section: string) {
    this.currentContent = section;
  }

  toggleMenu(id: number) {
    this.openedMenuId = this.openedMenuId === id ? null : id;
  }
}
