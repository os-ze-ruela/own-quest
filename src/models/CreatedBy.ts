
interface ICreatedBy {
    id: number;
    name: string;
    email: string;
    nickname: string;
}

class CreatedBy {
    id: number;
    name: string;
    email: string;
    nickname: string;

    constructor(constructor: ICreatedBy) {
        this.id = constructor.id;
        this.name = constructor.name;
        this.email = constructor.email;
        this.nickname = constructor.nickname;
    }
}

export default CreatedBy;
