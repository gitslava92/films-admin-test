import {useCallback, useState} from "react";
import {Category, CategoryAction, newCategory} from "../../FilmsAdminPanel";
import {ChangeLog, UseCategoryForm} from "../CategoryForm.types.ts";
import {generateId} from "../helpers/genereteId.ts";

export const useCategoryForm = ({initialCategories, category, handleCategoryAction}: UseCategoryForm) => {
  const [formCategory, setFormCategory] = useState<Category>({
    id: category?.id || generateId(),
    name: category?.name || "",
    subCategories: category?.subCategories || [],
  });

  const [changeLog, setChangeLog] = useState<ChangeLog>({
    newCategories: [],
    updatedCategories: [],
    deletedCategories: [],
  });

  const updateChangeLog = useCallback((currentCategory: Category) => {
    const isExist = initialCategories.some((c) => c.id === currentCategory.id);

    setChangeLog((prev) => {
      const {newCategories, updatedCategories, deletedCategories} = prev;

      const isNew = newCategories.some((c) => c.id === currentCategory.id);
      const isUpdated = updatedCategories.some((c) => c.id === currentCategory.id);
      const isDeleted = deletedCategories.some((c) => c.id === currentCategory.id);

      if (isDeleted) return prev;

      if (isNew) {
        return {
          ...prev,
          newCategories: newCategories.map((c) =>
            c.id === currentCategory.id ? currentCategory : c
          ),
        };
      }

      if (!isExist && currentCategory.name) {
        return {...prev, newCategories: [...newCategories, currentCategory]};
      }

      if ((isExist && !isUpdated) || isUpdated) {
        return {
          ...prev, updatedCategories: updatedCategories?.length ? updatedCategories.map((c) =>
            c.id === currentCategory.id ? currentCategory : c
          ) : [currentCategory],
        };
      }

      return prev;
    });
  }, [initialCategories]);


  const handleUpdateSubCategory = useCallback((subCategoryId: number, changes: Partial<Category["subCategories"][0]>) => {
    setFormCategory((prev) => {
      const updatedSubCategories = prev.subCategories.map((sub) =>
        sub.id === subCategoryId ? {...sub, ...changes} : sub
      );

      const updatedCategory = {...prev, subCategories: updatedSubCategories};

      updateChangeLog(updatedCategory);

      return updatedCategory;
    });
  }, [updateChangeLog]);

  const handleAddSubCategory = useCallback(() => {
    const newSubCategory = {id: generateId(), name: "", filmIds: []};
    setFormCategory((prev) => {
      const updatedCategory = {...prev, subCategories: [...prev.subCategories, newSubCategory]};
      updateChangeLog(updatedCategory);
      return updatedCategory;
    });
  }, [updateChangeLog]);

  const handleDeleteSubCategory = useCallback((subCategoryId: number) => {
    setFormCategory((prev) => {
      const updatedCategory = {
        ...prev,
        subCategories: prev.subCategories.filter((sub) => sub.id !== subCategoryId),
      };
      updateChangeLog(updatedCategory);
      return updatedCategory;
    });
  }, [updateChangeLog]);

  const handleDeleteCategory = useCallback((category: Category) => {
    const isExist = initialCategories.some((c) => c.id === category.id);
    handleCategoryAction(CategoryAction.Delete, category);
    setFormCategory(newCategory);
    setChangeLog((prev) => {
      if (isExist && !prev.deletedCategories.some((c) => c.id === category.id)) {
        return {...prev, deletedCategories: [...prev.deletedCategories, {id: category.id}]};
      }
      return prev;
    });
  }, [handleCategoryAction, initialCategories]);

  const handleChangeName = useCallback((name: string, subCategoryId?: number) => {
    if (subCategoryId) {
      handleUpdateSubCategory(subCategoryId, {name});
    } else {
      setFormCategory((prev) => {
        const updatedCategory = {...prev, name};
        updateChangeLog(updatedCategory);
        return updatedCategory;
      });
    }
  }, [handleUpdateSubCategory, updateChangeLog]);

  const handleUpdateFilms = useCallback((subCategoryId: number, filmIds: number[]) => {
    handleUpdateSubCategory(subCategoryId, {filmIds});
  }, [handleUpdateSubCategory]);

  const handleSubmit = useCallback(() => {
    handleCategoryAction(CategoryAction.Save, formCategory);
    console.log('formCategory', formCategory)
    console.log('changeLog', changeLog);
  }, [formCategory, changeLog, handleCategoryAction]);

  return {
    formCategory,
    handleAddSubCategory,
    handleDeleteSubCategory,
    handleDeleteCategory,
    handleChangeName,
    handleUpdateFilms,
    handleSubmit,
  };
};