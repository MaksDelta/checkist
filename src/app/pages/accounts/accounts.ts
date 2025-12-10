import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { lineChartConfig } from './chart-config';

Chart.register(...registerables);

interface MenuItem {
  title: string;
  content: string;
  buttons: string[];
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.scss'],
  standalone: true,
})
export class AccountsComponent implements AfterViewInit {
  @ViewChild('curveCanvas') curveCanvas!: ElementRef<HTMLCanvasElement>;

  menuItems: MenuItem[] = [
    {
      title: 'DESICION SUPPORT',
      content: '',
      buttons: [
        'Winnability',
        'Exposure Review & Suggested Coverage',
        'Portfolio Strategy Alignment',
        'Broker Analytics',
      ],
    },
    {
      title: 'RISK ASSESSMENT',
      content: '',
      buttons: ['Market Risk', 'Credit Risk', 'Operational Risk', 'Liquidity Risk'],
    },
    {
      title: 'DOCUMENTS AND COMPLIANCE',
      content: '',
      buttons: ['Policies', 'Regulatory Filings', 'Audit Reports', 'Internal Procedures'],
    },
  ];

  activeIndex = 0;
  activeButtonIndex: number | null = null;
  currentHeader: string = this.menuItems[0].buttons[0];

  private chart!: Chart;

  toggleItem(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = -1;
      this.activeButtonIndex = null;
    } else {
      this.activeIndex = index;
      this.activeButtonIndex = 0;
      this.currentHeader = this.menuItems[index].buttons[0];
    }
    this.updateChart();
  }

  setActiveButton(buttonIndex: number) {
    this.activeButtonIndex = buttonIndex;
    if (this.activeIndex >= 0) {
      this.currentHeader = this.menuItems[this.activeIndex].buttons[buttonIndex];
    }
    this.updateChart();
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.curveCanvas.nativeElement, lineChartConfig);
  }

  updateChart() {
    if (!this.chart) return;

    this.chart.data.datasets[0].data = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 20)
    );
    this.chart.update();
  }
}
