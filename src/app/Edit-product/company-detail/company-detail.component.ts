import { Component, ElementRef, Input, OnInit, Signal, SimpleChanges, ViewChild } from '@angular/core';
import { log } from 'console';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css'
})
export class CompanyDetailComponent implements OnInit {
  @ViewChild('comment') commentDiv!: ElementRef<HTMLDivElement>;
  companyDescription: any;
  description: any;
  @Input() infoTypeSignal!: Signal<string>;
  @Input() productDetail: any;
  isMenuOpen: boolean = false;
  formattedText: SafeHtml = '';
  formattedSpecText: SafeHtml = ''; 
  isBold = false;
  isItalic = false;
  isUnderline = false;
  constructor(private sanitizer: DomSanitizer) { }
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productDetail'] && this.productDetail) {
      console.log('productDetail updated:', this.productDetail);
      this.processDescription();
      this.processSpec(); // Process specifications
    }
  }
  ngOnInit(): void {
    this.processDescription();
  }
 updateButtonStyles(): void {
    this.isBold = document.queryCommandState('bold');
    this.isItalic = document.queryCommandState('italic');
    this.isUnderline = document.queryCommandState('underline');
  }
  execCommand(command: string): void {
    document.execCommand(command, false, undefined);
    // this.jobDescription = this.commentDiv.nativeElement.innerHTML;
  }

 
  processDescription(): void {
    const descriptionData = this.productDetail?.productStickers?.sProductFormattedDescription;
    this.formattedText = this.parseAndSanitize(descriptionData);
  }

  processSpec(): void {
    const specData = this.productDetail?.productStickers?.sProductFormattedSpec;
    this.formattedSpecText = this.parseAndSanitize(specData);
  }

  parseAndSanitize(data: string): SafeHtml {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        let htmlString = '';
        parsedData.forEach((item: any) => {
          let text = item.insert || '';
          let attributes = item.attributes || {};
          if (attributes.b) {
            text = `<b >${text}</b>`;
          }
          if (attributes.i) {
            text = `<i>${text}</i>`;
          }
          if (attributes.u) {
            text = `<u>${text}</u>`;
          }
          htmlString += text;
        });

        // Sanitize and return the HTML
        return this.sanitizer.bypassSecurityTrustHtml(htmlString);
      } catch (error) {
        console.error('Error parsing data:', error);
        return this.sanitizer.bypassSecurityTrustHtml('');
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml('');
  }

  textAreaFormat(event: string): void {
    const div = this.commentDiv.nativeElement;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;
    let replace: string = selectedText;
    if (event === 'upperCase') {
      replace = selectedText.toUpperCase();
    } else if (event === 'lowerCase') {
      replace = selectedText.toLowerCase();
    } else if (event === 'paragraph') {
      replace = selectedText.replace(/(\r\n|\n|\r)/gm, " ");
    } else if (event === 'sentencecase') {
      replace = this.sentenceCase(selectedText);
    } else if (event === 'titlecase') {
      replace = this.titleCase(selectedText);
    } else {
      return;
    }
    const newNode = document.createTextNode(replace);
    range.deleteContents();
    range.insertNode(newNode);
    this.companyDescription = div.innerHTML;
  }

  sentenceCase(str: string): string {
    let result = '';
    let capitalizeNext = true;
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (capitalizeNext && /[a-zA-Z]/.test(char)) {
        result += char.toUpperCase();
        capitalizeNext = false;
      } else {
        result += char.toLowerCase();
      }
      if (char === '.' || char === '!' || char === '?') {
        let nextIndex = i + 1;
        while (nextIndex < str.length && str.charAt(nextIndex) === ' ') {
          nextIndex++;
        }
        capitalizeNext = true;
        i = nextIndex - 1;
      }
    }
    return result;
  }

  titleCase(str: string): string {
    return str.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  onStyleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    
    if (selectedValue === 'h1') {
      document.execCommand('formatBlock', false, 'h1');
      this.applyCustomStyle('h1');
    } else if (selectedValue === 'h2') {
      document.execCommand('formatBlock', false, 'h2');
      this.applyCustomStyle('h2');
    } else {
      document.execCommand('formatBlock', false, 'p');
    }
  }

  applyCustomStyle(tag: string): void {
    const editor = this.commentDiv.nativeElement;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (tag === 'h1') {
      const span = document.createElement('span');
      span.style.fontSize = '10px';
      span.textContent = selectedText;
      range.deleteContents();
      range.insertNode(span);
    }
  }
  

}
