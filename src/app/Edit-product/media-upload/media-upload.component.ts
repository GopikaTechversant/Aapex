import { Component,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-media-upload',
  standalone: true,
  imports: [],
  templateUrl: './media-upload.component.html',
  styleUrl: './media-upload.component.css'
})
export class MediaUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  onUploadClick() {
    this.fileInput.nativeElement.click();
  }

  onFilesSelected(event: any) {
    const files = event.target.files || event.dataTransfer.files;
    if (files.length > 0) {
      this.handleFiles(files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files.length) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  private handleFiles(files: FileList) {
    Array.from(files).forEach(file => {
      console.log('File:', file.name);
    });
  }
}
