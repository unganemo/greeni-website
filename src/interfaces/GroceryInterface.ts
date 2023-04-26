interface Grocery {
	expires: string;
	purchased: string;
	name: string;
	id: string;
	has_id: string;
}

interface Groceries extends Array<Grocery> {
	groceries: Grocery[];
}

interface PureGrocery {
	name: string;
	id: string;
	days: number;
}

interface PureGroceries {
	groceries: PureGrocery[];
}

interface GroceryState {
	groceries: PureGrocery[];
	loading: boolean;
	error: string | null;
}
