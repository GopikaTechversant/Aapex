import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-print-download-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './print-download-modal.component.html',
  styleUrl: './print-download-modal.component.css'
})
export class PrintDownloadModalComponent implements OnInit{
  selectedFormat: string = 'svg';
  constructor(private dialogRef: MatDialogRef<PrintDownloadModalComponent>){}
  ngOnInit(): void {
  }

  onSubmit():void{
    this.dialogRef.close();
  }

  close():void{
    this.dialogRef.close();
  }
}
