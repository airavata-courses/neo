import { Injectable, Type } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';

@Injectable()
export class ModalService {
  constructor(private readonly dialog: MatDialog) {}

  isOpen<T>(dialogClass: Type<T>): boolean {
    return this.dialog.openDialogs.some(
      dialogRef => dialogRef.componentInstance instanceof dialogClass
    );
  }

  open<T, D = any, R = any>(
    dialogClass: Type<T> & { readonly config?: MatDialogConfig<D> },
    config: MatDialogConfig<D> = {}
  ): MatDialogRef<T, R> {
    this.closeLastDialog();
    return this.dialog.open<T, D, R>(dialogClass, {
      ...(dialogClass.config || {}),
      ...config
    });
  }

  closeLastDialog() {
    this.dialog.closeAll();
  }
}
