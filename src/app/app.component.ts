import {Component} from '@angular/core';
import {MacrosService} from './macros.service';
import {Command} from './command';
import {CommandTitles} from './comand-titles.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private speed = 50;
  private time = 1;

  constructor(public macroService: MacrosService) {
  }

  addUpCommand() {
    this.macroService.addComand(new Command(CommandTitles.up, this.speed));
  }

  addDownCommand() {
    this.macroService.addComand(new Command(CommandTitles.down, this.speed));
  }
  addLeftCommand() {
    this.macroService.addComand(new Command(CommandTitles.left, this.speed));
  }
  addRightCommand() {
    this.macroService.addComand(new Command(CommandTitles.right, this.speed));
  }
  addResetCommand() {
    this.macroService.addComand(new Command(CommandTitles.reset, this.speed));
  }
  addWaitCommand() {
    this.macroService.addComand(new Command(CommandTitles.wait, this.time));
  }

}
