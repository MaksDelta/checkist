import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-modal.html',
  styleUrls: ['./edit-modal.scss'],
})
export class EditModalComponent {
  @Input() data: any = null;
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  clonedData: any = {};

  ngOnChanges() {
    if (this.data) {
      this.clonedData = { ...this.data };
    }
  }

  onSave() {
    this.save.emit(this.clonedData);
  }

  onClose() {
    this.close.emit();
  }

  get keys(): string[] {
    if (!this.clonedData) return [];
    return Object.keys(this.clonedData).filter((key) => key !== 'id');
  }

  onBackdropClick(event: MouseEvent) {
    this.onClose();
  }
}
