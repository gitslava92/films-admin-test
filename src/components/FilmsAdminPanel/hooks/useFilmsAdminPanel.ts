import {useState, useCallback} from "react";
import {Category, CategoryAction} from "../FilmsAdminPanel.types.ts";
import {initialData} from "../helpers/initialData.ts";
import {generateId} from "../../CategoryForm/helpers/genereteId.ts";

export const newCategory = {id: generateId(), name: '', subCategories: []};

export const useFilmsAdminPanel = () => {
  const [categories, setCategories] = useState<Category[]>(initialData.categories);
  const [category, setCategory] = useState<Category | null>(null);

  const handleCategoryAction = useCallback((action: CategoryAction, categoryData?: Category) => {
    if (action === CategoryAction.Create) setCategory(newCategory);
    if (action === CategoryAction.Edit && categoryData) setCategory(categoryData);
    if (action === CategoryAction.Delete && categoryData) {
      setCategories(prev => prev.filter((c) => c.id !== categoryData.id));
      setCategory(null);
    }
    if (action === CategoryAction.Save) {
      setCategories(prev => categoryData?.name ? prev.filter((c) => c.id !== categoryData.id).concat(categoryData) : prev);
      setCategory(null);
    }
    if (action === CategoryAction.Cancel) setCategory(null);
  }, []);

  return {
    initialCategories: initialData.categories,
    films: initialData.films,
    categories,
    category,
    handleCategoryAction,
  };
};
