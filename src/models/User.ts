import Category from "./Category";

interface IUser {
    id: number;
    name: string;
    nickname: string;
    email: string;
    birthDate: Date;
    photo: string | null;
    isFollowed: boolean;
    following: number;
    followers: number;
    categories: Category[];
}

class User {
    id: number;
    name: string;
    nickname: string;
    email: string;
    birthDate: Date;
    photo: string | null;
    isFollowed: boolean = false;
    following: number;
    followers: number;
    categories: Category[];

    constructor(constructor: IUser) {
        this.id = constructor.id;
        this.name = constructor.name;
        this.nickname = constructor.nickname;
        this.email = constructor.email;
        this.birthDate = constructor.birthDate
        this.photo = constructor.photo!;
        this.isFollowed = constructor.isFollowed;
        this.following = constructor.following;
        this.followers = constructor.followers;
        this.categories =   constructor.categories.length > 0 ? constructor.categories.map((category) => {
            return new Category(category)
        }): [];
    }
}

export default User;
