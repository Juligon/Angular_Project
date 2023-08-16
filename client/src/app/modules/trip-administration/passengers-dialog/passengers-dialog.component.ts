import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-passengers-dialog',
  templateUrl: './passengers-dialog.component.html',
  styleUrls: ['./passengers-dialog.component.css'],
})
export class PassengersDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PassengersDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
