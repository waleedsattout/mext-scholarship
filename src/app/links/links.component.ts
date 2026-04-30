import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-links',
  imports: [CommonModule],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent {
  expandedAccordion: string | null = 'general';

  toggleAccordion(section: string) {
    if (this.expandedAccordion === section) {
      this.expandedAccordion = null;
    } else {
      this.expandedAccordion = section;
    }
  }
}