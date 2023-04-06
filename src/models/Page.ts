import { Button } from './Button';
export class Page {
  id: number;
  title: string;
  description: string;
  color: string;
  isLastPage: boolean = false;
  buttons: Button[];

  constructor(id: number, title: string,  description: string, color: string, buttons: Button[]) {
    this.id = id;
    this.title = title;
    this.color = color ?? '#568EA3';
    this.description = description;
    this.buttons = buttons;
  }
}
