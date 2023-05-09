import Category from "./Category";
import CreatedBy from "./CreatedBy";

interface IGame {
    id: number;
    title: string;
    description: string;
    favorites: number;
    image: string | null;
    isEditing: boolean;
    isPublished: boolean;
    isDeleted: boolean;
    isFavorited: boolean;
    createdAt: Date;
    categories: Category[];
    createdBy?: CreatedBy | null;
}

class Game {
    id: number;
    title: string;
    description: string;
    image: string;
    favorites: number;
    isEditing: boolean = false;
    isPublished: boolean = false;
    isDeleted: boolean = false;
    isFavorited: boolean = false;
    createdAt: Date;
    categories: Category[];
    createdBy: CreatedBy | null;

    constructor(constructor: IGame) {
        this.id = constructor.id;
        this.title = constructor.title;
        this.description = constructor.description;
        this.image = constructor.image!;
        this.favorites = constructor.favorites;
        this.isEditing = constructor.isEditing;
        this.isPublished = constructor.isPublished;
        this.isDeleted = constructor.isDeleted;
        this.isFavorited = constructor.isFavorited;
        this.createdAt = constructor.createdAt;
        this.createdBy = constructor.createdBy ?? null;
        this.categories =   constructor.categories.length > 0 ? constructor.categories.map((category) => {
            return new Category(category)
        }): [];
    }
}

export default Game;
