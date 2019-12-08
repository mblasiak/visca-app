import {Injectable} from '@angular/core';
import {Command} from './command';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CommandMacro} from './command-macro';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacrosService {

  private saveUrl = 'visca/macro';
  private executeUrl = 'visca/execute';
  private getAllUrl = 'visca/macro';
  address = 1;
  macroName = this.newMacroNam();
  currentMacroConfig: Command[] = [];
  macros: CommandMacro[] = [new CommandMacro('Bob', 'q213123')];
  erroRresponse = '';
  succesRresponse = '';

  constructor(private httpClient: HttpClient) {
    httpClient.get(this.getAllUrl).subscribe((macroList: CommandMacro[]) => this.macros = macroList);
  }

  addComand(command: Command) {
    this.currentMacroConfig.push(command);
  }

  removeCommand(command: Command) {
    this.currentMacroConfig = this.currentMacroConfig.filter(value => value !== command);
  }

  saveMacro() {
    this.httpClient.post(this.saveUrl, {address: this.address, name: this.macroName, commands: this.currentMacroConfig})
      .subscribe(
        (macro: CommandMacro) => {
          this.macros.push(macro);
          this.currentMacroConfig = [];
          this.succesRresponse = 'Macro Saved';
          this.erroRresponse = '';
          this.macroName = this.newMacroNam();
        }, (error: HttpErrorResponse) => {
          this.erroRresponse = 'Failed to save macro';
          this.succesRresponse = '';
        });
  }

  executeMacro() {
    this.httpClient.post(this.executeUrl, {address: this.address, commands: this.currentMacroConfig}).subscribe(
      value => {
        this.succesRresponse = 'Execution Started';
        this.erroRresponse = '';
      }, (error: HttpErrorResponse) => {
        this.erroRresponse = 'Camera Buisy';
        this.succesRresponse = '';
      });
  }

  executeSavedMacro(macro: CommandMacro) {
    this.httpClient.post(this.executeUrl + '/' + macro.id, null).subscribe(
      value => {
        this.succesRresponse = 'Execution of ' + macro.name + ' started';
        this.erroRresponse = '';
      }, (error: HttpErrorResponse) => {
        this.erroRresponse = 'Camera Buisy';
        this.succesRresponse = '';
      }
    );
  }

  private newMacroNam(): string {
    return 'Macro ' + (Math.random() * 100000 + 1).toFixed(0);
  }
}
