import {Container} from "@mui/material";
import {useFilmsAdminPanel} from "./hooks";
import {CategoryForm} from "../CategoryForm";
import {CategoriesList} from "../CategoriesList";

export const FilmsAdminPanel = () => {
  const {
    initialCategories,
    films,
    categories,
    category,
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleSaveCategory,
    handleCancel
  } = useFilmsAdminPanel()

  return (
    <Container maxWidth={'md'}>
      {category
        ? <CategoryForm
          initialCategories={initialCategories}
          category={category}
          films={films}
          onDeleteCategory={handleDeleteCategory}
          onSaveCategory={handleSaveCategory}
          handleCancel={handleCancel}
        />
        : <CategoriesList
          categories={categories}
          films={films}
          handleEditCategory={handleEditCategory}
          handleCreateCategory={handleCreateCategory}
        />
      }
    </Container>
  );
};
