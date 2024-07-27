export class FoodEntity {
  id!: string;
  name!: string;
  price!: number;
  description!: string;
  image!: string;
  discount_price!: number;

  constructor(partial: Partial<FoodEntity>) {
    this.id = partial.id!;
    this.name = partial.name!;
    this.price = partial.price!;
    this.description = partial.description!;
    this.image = partial.image!;
  }
}
