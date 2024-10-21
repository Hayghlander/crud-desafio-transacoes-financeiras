import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TransacaoService } from '../../services/transacao.service';
import { TipoTransacao } from '../../models/TipoTransacao';

@Component({
  standalone: true,
  selector: 'app-transacao-form',
  templateUrl: './transacao-form.component.html',
  styleUrl: './transacao-form.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class TransacaoFormComponent implements OnInit {

  transacaoForm: FormGroup;
  isEdit: boolean = false;
  tiposTransacao: TipoTransacao[] = [];

  constructor(
    private fb: FormBuilder,
    private transacaoService: TransacaoService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TransacaoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  // Dados da transação
  ) {
    this.transacaoForm = this.fb.group({
      descricao: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      categoria: ['', Validators.required],
      tipo_transacao: [null, Validators.required]
    });

    // Carregar os tipos de transação
    this.carregarTiposTransacao();

    if (this.data && this.data.transacao) {
      this.isEdit = true;
      this.transacaoForm.patchValue(this.data.transacao);  // Preenche o formulário com os dados da transação
    }

  }

  ngOnInit(): void { }

  carregarTiposTransacao(): void {
    // Aqui você faz uma requisição ao backend para obter a lista de tipos de transação
    this.transacaoService.getTiposTransacao().subscribe(data => {
      this.tiposTransacao = data;
    });
  }

  // Função para verificar se o campo tem erro
  hasError(field: string, error: string): boolean {
    const control = this.transacaoForm.get(field);
    return control != null && control.hasError(error) && control.touched;
  }

  // Função para salvar a transação
  onSubmit(): void {
    if (this.transacaoForm.valid) {
      const formData = this.transacaoForm.value;

      // Inclui tanto o id quanto o nome do tipo de transação no envio
      const tipoTransacao = this.transacaoForm.get('tipo_transacao')?.value;
      formData.tipo_transacao_id = tipoTransacao.id;
      formData.tipo_transacao_nome = tipoTransacao.nome;
      formData.tipo = tipoTransacao.nome.toLowerCase();

      if (this.isEdit) {
        // Chamada para atualizar a transação
        this.transacaoService.updateTransacao(this.data.transacao.id, formData).subscribe({
          next: () => {
            this.dialogRef.close(true);  // Fecha o diálogo e indica que a transação foi atualizada
            this.snackBar.open('Transação editada com sucesso!', 'Fechar', {
              duration: 3000
            });
            this.dialogRef.close(true);
            this.load();
          },
          error: err => {
            console.error('Erro ao atualizar transação', err);
            this.snackBar.open('Erro ao atualizar transação', 'Fechar', {
              duration: 3000
            });
          }
        });
      } else {
        // Caso seja criação de uma nova transação
        this.transacaoService.createTransacao(formData).subscribe({
          next: () => {
            this.dialogRef.close(true);  // Fecha o diálogo e indica que a transação foi criada
            this.snackBar.open('Transação criada com sucesso!', 'Fechar', {
              duration: 3000
            });
            this.load();

          },
          error: err => {
            this.snackBar.open('Erro ao criar transação', 'Fechar', {
              duration: 3000
            });
            console.error('Erro ao criar transação', err);
          }
        });
      }
    } else {
      this.transacaoForm.markAllAsTouched();
    }
  }

  // Função para cancelar o diálogo
  onCancel(): void {
    this.dialogRef.close(false);  // Fecha o diálogo sem realizar alterações
  }

  load() {
    const HAS_RELOAD = 'hasReload';
    const hasReload = sessionStorage.getItem(HAS_RELOAD);
    if (!hasReload) {
      sessionStorage.setItem(HAS_RELOAD, 'true');
      location.reload();
    }
  }

}
