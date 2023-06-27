import { Author } from "./Autor";


export interface IComment {
    id?: number;
    author: Author
    comment: string;
    gameId: number;
  }
  
  class Comment {
    id?: number;
    author: Author;
    comment: string;
    gameId: number;
  
    constructor(constructor: IComment) {
      this.id = constructor.id;
      this.author = constructor.author
      this.comment = constructor.comment
      this.gameId = constructor.gameId
    }
  }
  
  export default Comment;