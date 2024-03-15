import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SafePipe } from 'app/components/utils/safe-pipe';

@Component({
  selector: 'app-fragman-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    SafePipe
  ],
  template: `
  <div class="w-100 h-100 overflow-hidden">
              <iframe class="overflow-hidden" autoplay width="700px" height="445px" type="video/mp4" controls
                    [src]="pathFragman | safe"></iframe>
  </div>
 
`,
  styleUrl: './fragman-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FragmanDialogComponent implements OnInit {
  pathFragman: string = '';
  constructor(
    public dialogRef: MatDialogRef<FragmanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
    this.pathFragman = this.data.fragmanPath;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
