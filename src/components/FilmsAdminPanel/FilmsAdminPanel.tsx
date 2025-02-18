import {Box, Container} from "@mui/material";
import {useFilmsAdminPanel} from "./hooks";
import {CategoryForm} from "../CategoryForm";
import {CategoriesList} from "../CategoriesList";

export const FilmsAdminPanel = () => {
  const {
    initialCategories,
    films,
    categories,
    category,
    handleCategoryAction,
  } = useFilmsAdminPanel()

  return (
    <Container maxWidth={'md'}>
      {category
        ? <CategoryForm
          initialCategories={initialCategories}
          category={category}
          films={films}
          handleCategoryAction={handleCategoryAction}
        />
        : <CategoriesList
          categories={categories}
          films={films}
          handleCategoryAction={handleCategoryAction}
        />
      }
    </Container>
  );
};
