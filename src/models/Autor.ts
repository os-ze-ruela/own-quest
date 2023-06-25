export interface IAuthor {
    id: number;
    nickname: string;
    photo?: string | null;
  }

  export class Author {
    id: number;
    nickname: string;
    photo?: string | null;
  
    constructor(constructor: IAuthor) {
      this.id = constructor.id;
      this.nickname = constructor.nickname;
      this.photo = constructor.photo;
    }
  }