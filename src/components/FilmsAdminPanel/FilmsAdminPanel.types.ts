export interface Film {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
  filmIds: number[];
}

export interface Category {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

export enum CategoryAction {
  Create,
  Edit,
  Delete,
  Save,
  Cancel
}
