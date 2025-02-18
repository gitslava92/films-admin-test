import {useState} from "react";
import {Category} from "../FilmsAdminPanel.types";
import {initialData} from "../helpers/initialData";
import {newCategory} from "../constants/constants";

export const useFilmsAdminPanel = () => {
  const [categories, setCategories] = useState<Category[]>(initialData.categories);
  const [category, setCategory] = useState<Category | null>(null);

  const handleCreateCategory = () => {
    setCategory(newCategory)
  };

  const handleEditCategory = (categoryData: Category) => {
    setCategory(categoryData);
  };

  const handleDeleteCategory = (categoryData: Category) => {
    setCategories(prev => prev.filter((c) => c.id !== categoryData.id));
    setCategory(null);
  };


  const handleSaveCategory = (categoryData: Category) => {
    setCategories(prev => categoryData?.name ? prev.filter((c) => c.id !== categoryData.id).concat(categoryData) : prev);
    setCategory(null);
  };

  const handleCancel = () => {
    setCategory(null);
  };

  return {
    initialCategories: initialData.categories,
    films: initialData.films,
    categories,
    category,
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleSaveCategory,
    handleCancel
  };
};
