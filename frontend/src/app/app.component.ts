import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TransacaoFormComponent } from './components/transacao-form/transacao-form.component';
import { TransacaoListComponent } from './components/transacao-list/transacao-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    MatDialogModule, 
    MatButtonModule, 
    TransacaoFormComponent,
    TransacaoListComponent,
    MatIconModule
  ]
})
export class AppComponent {
  title = 'gerenciador-transacoes';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TransacaoFormComponent, {
      width: '460px',
      disableClose: false,  // Impede que o usuário feche o diálogo clicando fora dele
    });

    dialogRef.afterClosed().subscribe(result => {});
  }



}
