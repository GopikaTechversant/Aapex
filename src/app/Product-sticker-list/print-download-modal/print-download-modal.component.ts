import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-print-download-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './print-download-modal.component.html',
  styleUrls: ['./print-download-modal.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class PrintDownloadModalComponent implements OnInit {
  selectedFormat: string = '';
  selectedType: string = '';

  constructor(
    private dialogRef: MatDialogRef<PrintDownloadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.selectedType = this.data;
    if (this.selectedType === 'print')
      this.selectedFormat = '2X2'; // This should match the radio button value
    else if (this.selectedType === 'download') this.selectedFormat = 'svg';
  }

  openImageInPdf(imageUrl: string, width: number, height: number) {
    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const imgWidth = width * 72; // Convert inches to points
      const imgHeight = height * 72;

      const xPos = (pageWidth - imgWidth) / 2;
      const yPos = (pageHeight - imgHeight) / 2;

      pdf.addImage(img, 'JPEG', xPos, yPos, imgWidth, imgHeight);
      pdf.output('dataurlnewwindow');
    };
  }

  onSubmit(): void {
    if (this.selectedType === 'print') {
      if (this.selectedFormat === '2X2') {
        // Match the value used in the radio button
        this.openImageInPdf('assets/images/image_icon.png', 2, 2);
      } else if (this.selectedFormat === '5x7') {
        // Match the value used in the radio button
        this.openImageInPdf('assets/images/image_icon.png', 5, 7);
      }
    } else if (this.selectedType === 'download') {
      this.openImageInPdf('assets/images/image_icon.png', 2, 2); // Example: default dimensions for downloads
    }

    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
