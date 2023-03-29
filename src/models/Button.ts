export class Button {
    id: number;
    title: string;
    nextPageId: number;
    icon: string;
    color: string;
  
    constructor(id: number, title: string, nextPageId: number, icon: string, color: string) {
      this.id = id;
      this.title = title;
      this.nextPageId = nextPageId;
      this.icon = icon;
      this.color = color;
    }
  }
  