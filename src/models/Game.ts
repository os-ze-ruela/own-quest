import Category from "./Category";

interface IGame {
    id: number;
    title: string;
    description: string;
    image: string | null;
    isEditing: boolean;
    isPublished: boolean;
    isDeleted: boolean;
    createdAt: Date;
    categories: Category[];
}

class Game {
    id: number;
    title: string;
    description: string;
    image: string;
    isEditing: boolean = false;
    isPublished: boolean = false;
    isDeleted: boolean = false;
    createdAt: Date;
    categories: Category[];

    constructor(constructor: IGame) {
        this.id = constructor.id;
        this.title = constructor.title;
        this.description = constructor.description;
        this.image = constructor.image!;
        this.isEditing = constructor.isEditing;
        this.isPublished = constructor.isPublished;
        this.isDeleted = constructor.isDeleted;
        this.createdAt = constructor.createdAt;
        this.categories = constructor.categories.map((category) => {
            console.log(category)
            return new Category(category)
        });
    }
}

export default Game;
