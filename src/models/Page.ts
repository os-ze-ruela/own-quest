import { Button } from './Button'; 
export class Page {
  id: number;
  title: string;
  description: string;
  color: string;
  list: Button[];

  constructor(id: number, title: string,  description: string, color: string, list: Button[]) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.description = description;
    this.list = list;
  }
}
