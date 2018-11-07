import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  constructor(private snackBar: MatSnackBar) { }

  public sendMessage(message: string, action?: string) {
    console.log(message);
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
