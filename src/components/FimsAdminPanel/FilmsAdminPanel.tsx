import {CategoryForm} from "../CategoryForm/CategoryForm.tsx";
import {CategoriesList} from "../CategoriesList/CategoriesList.tsx";
import {useFilmsAdminPanel} from "./useFilmsAdminPanel.ts";
import {Box} from "@mui/material";

export const FilmsAdminPanel = () => {
  const {
    initialCategories,
    films,
    categories,
    category,
    handleCategoryAction,
  } = useFilmsAdminPanel()

  return (
    <Box sx={{m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
    </Box>
  );
};
