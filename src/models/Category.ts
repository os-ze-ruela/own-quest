interface ICategory {
  id: number;
  title: string;
  color: string;
  plus18: boolean;
}

class Category {
  id: number;
  title: string;
  color: string;
  plus18: boolean;

  constructor(constructor: ICategory) {
    this.id = constructor.id;
    this.title = constructor.title;
    this.color = constructor.color;
    this.plus18 = constructor.plus18;
  }
}

export default Category;