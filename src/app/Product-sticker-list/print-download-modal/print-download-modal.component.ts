import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-print-download-modal',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './print-download-modal.component.html',
  styleUrl: './print-download-modal.component.css'
})
export class PrintDownloadModalComponent implements OnInit{
  selectedFormat: string = '';
  selectedType:string = '';
  constructor(private dialogRef: MatDialogRef<PrintDownloadModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
    this.selectedType = this.data;
    if(this.selectedType === 'print') this.selectedFormat = '2X2';
    else if(this.selectedType === 'download') this.selectedFormat = 'svg';
  }

  onSubmit():void{
    this.dialogRef.close();
  }

  close():void{
    this.dialogRef.close();
  }
}
