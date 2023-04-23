interface Grocery {
  expires: string;
  purchased: string;
  name: string;
  id: string;
}

interface Groceries extends Array<Grocery> {
  groceries: Grocery[];
}
