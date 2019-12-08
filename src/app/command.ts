import {CommandTitles} from './comand-titles.enum';

export class Command {
  command: CommandTitles;
  speed: number;

  constructor(title: CommandTitles, speed: number) {
    this.command = title;
    this.speed = speed;
  }

}
