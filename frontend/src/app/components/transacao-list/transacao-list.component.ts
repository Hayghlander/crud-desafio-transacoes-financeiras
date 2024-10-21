import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransacaoService } from '../../services/transacao.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import {Transacao} from '../../models/Transacao';
import { TransacaoFormComponent } from '../transacao-form/transacao-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';  // Caixa de diálogo de confirmação

@Component({
  selector: 'app-transacao-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  templateUrl: './transacao-list.component.html',
  styleUrl: './transacao-list.component.css'
})
export class TransacaoListComponent implements OnInit {

  transacoes: Transacao[] = [];
  filtro = new FormControl('');  // FormControl para o filtro
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['descricao', 'valor', 'tipo', 'acoes'];

  constructor(private transacaoService: TransacaoService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.carregarTransacoes();
    this.setupFiltro();  // Configura o filtro
  }

  // Carrega a lista de transações do backend
  carregarTransacoes(): void {
    this.transacaoService.getTransacoes().subscribe(data => {
      this.transacoes = data.map(transacao => {
        const tipo = transacao.tipo_transacao_id === 1 ? 'Receita' : 'Despesa';
        return {
          ...transacao,
          tipo: tipo
        };
      });
      this.dataSource.data = this.transacoes;
    });
  }

  // Configura o filtro para aplicar a todas as colunas
  setupFiltro(): void {
    this.filtro.valueChanges.subscribe(value => {
      this.dataSource.filter = !!value ? value.trim().toLowerCase() : '';  // Aplica o filtro em letras minúsculas
    });

    // Definir como a filtragem será aplicada (considera todos os campos)
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = `${data.descricao} ${data.valor} ${data.tipo} ${data.categoria}`.toLowerCase();
      return dataStr.includes(filter);
    };
  }

  // Abre o diálogo com os dados da transação para edição
  editarTransacao(transacao: any): void {
    const dialogRef = this.dialog.open(TransacaoFormComponent, {
      width: '460px',
      data: { transacao }  // Passa os dados da transação para o formulário
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarTransacoes();  // Recarrega a lista após a edição
      }
    });
  }

  // Abre a caixa de diálogo de confirmação e deleta a transação se o usuário confirmar
  deletarTransacao(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se o usuário confirmar, deletar a transação
        this.transacaoService.deleteTransacao(id).subscribe({
          next: () => {
            console.log('Transação excluída com sucesso');
            this.carregarTransacoes();  // Atualiza a lista após exclusão
            this.snackBar.open('Transação excluída com sucesso!', 'Fechar', {
              duration: 3000
            });
          },
          error: (err) => {
            console.error('Erro ao excluir a transação', err);
            this.snackBar.open('Erro ao excluir a transação', 'Fechar', {
              duration: 4000
            });
          }
        });
      }
    });
  }
}
