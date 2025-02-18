import {Category} from "../FilmsAdminPanel";

export interface UseCategoryForm {
  initialCategories: Category[];
  category: Category;
  onDeleteCategory: (category: Category) => void;
  onSaveCategory: (category: Category) => void;
}

export interface ChangeLog {
  newCategories: Category[];
  updatedCategories: Category[];
  deletedCategories: { id: number }[];
}