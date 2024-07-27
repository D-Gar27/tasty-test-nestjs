export class ToppingEntity {
  id!: string;
  label!: string;
  food_id!: string;
  items!: { name: string; add_on_price: number }[];
}
