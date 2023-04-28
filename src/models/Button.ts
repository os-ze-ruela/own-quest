export class Button {
    id: number;
    title: string;
    color: string;
    icon: string;
    nextPageId: number;
  
    constructor(id: number, title: string,  color: string, icon: string,  nextPageId: number,) {
      this.id = id;
      this.title = title;
      this.color = color;
      this.icon = icon;
      this.nextPageId = nextPageId;
    }
  }
  