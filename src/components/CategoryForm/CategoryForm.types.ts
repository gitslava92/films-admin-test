import {Category, CategoryAction} from "../FilmsAdminPanel";

export interface UseCategoryForm {
  initialCategories: Category[];
  category: Category;
  handleCategoryAction: (action: CategoryAction, category?: Category) => void;
}

export interface ChangeLog {
  newCategories: Category[];
  updatedCategories: Category[];
  deletedCategories: { id: number }[];
}