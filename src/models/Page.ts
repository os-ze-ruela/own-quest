import { Button } from './Button';
export class Page {
  id: number;
  title: string;
  description: string;
  color: string;
  number_page: number;
  isLastPage: boolean = false;
  icon: string;
  buttons: Button[];

  constructor(id: number, title: string,  description: string, color: string, number_page: number, isLastPage: boolean, icon: string, buttons: Button[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.color = color ?? '#568EA3';
    this.number_page = number_page;
    this.isLastPage = isLastPage;
    this.icon = icon;
    this.buttons = buttons;
  }
}
