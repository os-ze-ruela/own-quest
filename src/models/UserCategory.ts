interface IUserCategory {
  id: number;
  title: string;
  color: string;
  timesUsed: number;
}

class UserCategory {
  id: number;
  title: string;
  color: string;
  timesUsed: number;

  constructor(constructor: IUserCategory) {
    this.id = constructor.id;
    this.title = constructor.title;
    this.color = constructor.color;
    this.timesUsed = constructor.timesUsed;
  }
}

export default UserCategory;