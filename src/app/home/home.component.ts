import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  protected readonly title = signal('أسئلة وأجوبة حول منحة ميكست');
  protected readonly faqs = signal<FAQ[]>([]);
  protected searchQuery = '';
  protected searchInAnswers = false;
  protected useEnhancedData = true;
  protected expandedAccordion: string | null = 'general';

  ngOnInit() {
    this.loadFAQs();
  }

private loadFAQs() {
  const source = this.useEnhancedData ? 'q&a.json' : 'q&a original.json';
  const encodedSource = encodeURIComponent(source);
  fetch(encodedSource)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`Loaded ${data.length} FAQs from ${source}`);
      this.faqs.set(data);
    })
    .catch(err => {
      console.error('Error loading FAQs from', source, err);
      // Optionally, you could reload the previous data or show an error message
    });
}

  onSearch() {
    // Trigger change detection
  }

  onSourceChange() {
    console.log(this.useEnhancedData)

    this.loadFAQs();
  }

  toggleAccordion(section: string) {
    if (this.expandedAccordion === section) {
      this.expandedAccordion = null;
    } else {
      this.expandedAccordion = section;
    }
  }

  filteredFaqs() {
    const query = this.searchQuery?.trim().toLowerCase();
    if (!query) {
      return this.faqs();
    }

    return this.faqs().filter(faq => {
      const matchesQuestion = faq.question.toLowerCase().includes(query);
      if (this.searchInAnswers) {
        const matchesAnswer = faq.answer.toLowerCase().includes(query);
        return matchesQuestion || matchesAnswer;
      }
      return matchesQuestion;
    });
  }
}