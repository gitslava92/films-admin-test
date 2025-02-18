import {Box, Button, List, Typography} from "@mui/material";
import {Category, CategoryAction, Film} from "../FilmsAdminPanel";
import {CategoryItem} from "../CategoryItem";

interface CategoriesListProps {
  categories: Category[];
  films: Film[];
  handleCategoryAction: (action: CategoryAction, category?: Category) => void;
}

export const CategoriesList = ({categories, films, handleCategoryAction}: CategoriesListProps) => {
  return (
    <Box>
      <Typography variant="h3" mb={4} textAlign="center">Управление кинотеатром</Typography>
      <Button variant="contained" onClick={() => handleCategoryAction(CategoryAction.Create)} sx={{ ml: 3 }}>
        Добавить новую категорию
      </Button>
      {!!categories?.length && (
        <List sx={{p: 3}}>
          {categories.map((category) => (
            <CategoryItem
              category={category}
              films={films}
              handleCategoryAction={handleCategoryAction}
              key={category.id}
            />
          ))}
        </List>
      )}
    </Box>
  );
};
