import { Component } from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  template: `
    <h2 mat-dialog-title>Confirmación</h2>
    <mat-dialog-content>La acción se ha realizado con éxito</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Aceptar</button>
    </mat-dialog-actions>
  `,
})
export class AppConfirmationDialogComponent {
  constructor(private dialog: MatDialog) { }


  openConfirmationDialog() {
    this.dialog.open(AppConfirmationDialogComponent);
  }

}
