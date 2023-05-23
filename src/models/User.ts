import UserCategory from "./UserCategory";

interface IUser {
    id: number;
    name: string;
    email: string;
    nickname: string;
    birthDate: Date;
    followers: number;
    following: number;
    photo: string | null;
    createdAt: Date;
    isDeleted: boolean;
    isFollowing: boolean;
    categories: UserCategory[];
}

class User {
    id: number;
    name: string;
    email: string;
    nickname: string;
    birthDate: Date;
    followers: number;
    following: number;
    photo: string | null;
    createdAt: Date;
    isDeleted: boolean;
    isFollowing: boolean = false;
    categories: UserCategory[];

    constructor(constructor: IUser) {
        this.id = constructor.id;
        this.name = constructor.name;
        this.email = constructor.email;
        this.nickname = constructor.nickname;
        this.birthDate = constructor.birthDate;
        this.followers = constructor.followers;
        this.following = constructor.following;
        this.photo = constructor.photo!;
        this.createdAt = constructor.createdAt;
        this.isDeleted = constructor.isDeleted;
        this.isFollowing = constructor.isFollowing;
        this.categories =   constructor.categories.length > 0 ? constructor.categories.map((category) => {
            return new UserCategory(category)
        }): [];
    }
}

export default User;
