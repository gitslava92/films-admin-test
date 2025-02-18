import {Box, Button, List, Typography} from "@mui/material";
import {Category, Film} from "../FilmsAdminPanel";
import {CategoryItem} from "../CategoryItem";

interface CategoriesListProps {
  categories: Category[];
  films: Film[];
  handleEditCategory: (category: Category) => void;
  handleCreateCategory: () => void;
}

export const CategoriesList = ({categories, films, handleEditCategory, handleCreateCategory}: CategoriesListProps) => {
  return (
    <Box>
      <Typography variant="h3" mb={4} textAlign="center">Управление кинотеатром</Typography>
      <Button variant="contained" onClick={() => handleCreateCategory()} sx={{ ml: 3 }}>
        Добавить новую категорию
      </Button>
      {!!categories?.length && (
        <List sx={{p: 3}}>
          {categories.map((category) => (
            <CategoryItem
              category={category}
              films={films}
              handleEditCategory={handleEditCategory}
              key={category.id}
            />
          ))}
        </List>
      )}
    </Box>
  );
};
