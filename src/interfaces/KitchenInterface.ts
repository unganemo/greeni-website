interface Kitchen {
  kitchen_id: string;
  kitchen_name: string;
  isOwner: boolean;
  location: Neo4JLocationPoint;
  groceries: Groceries[];
}

interface Neo4JLocationPoint {
  srid: Srid;
  x: number;
  y: number;
}

interface Srid {
  low: number;
  high: number;
}

interface KitchensState {
  kitchens: Kitchen[];
  loading: boolean;
  error: string | null;
}
