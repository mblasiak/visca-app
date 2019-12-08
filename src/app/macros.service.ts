import {Injectable} from '@angular/core';
import {Command} from './command';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MacrosService {

  private executeUrl = 'visca/macro';
  private getAllUrl = 'visca/macro';
  address = 1;

  currentMacroConfig: Command[] = [];

  constructor(private httpClient: HttpClient) {
    httpClient.get(this.getAllUrl).subscribe(value => console.log(value));
  }

  addComand(command: Command) {
    this.currentMacroConfig.push(command);
  }

  removeCommand(command: Command) {
    this.currentMacroConfig.push(command);
  }

  saveMacro() {
    //  SAVE MACRO
  }

  executeMacro() {
    this.httpClient.post(this.executeUrl, {address: this.address, commands: this.currentMacroConfig}).subscribe(
      value => console.log(value)
    );
  }
}
