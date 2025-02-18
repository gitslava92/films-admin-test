import {Box, IconButton, List, Typography} from "@mui/material";
import {Category, CategoryAction, Film} from "../FimsAdminPanel/FilmsAdminPanel.types.ts";
import {Edit} from "@mui/icons-material";

interface CategoryItemProps {
  category: Category;
  films: Film[];
  handleCategoryAction: (action: CategoryAction, category?: Category) => void;
}

export const CategoryItem = ({category, handleCategoryAction, films}: CategoryItemProps) => {
  return (
      <Box>
        <Typography variant="h4" sx={{ display: 'flex', gap: 3 }}>
          {category.name}
          <IconButton
            color="primary"
            onClick={() => handleCategoryAction(CategoryAction.Edit, category)}
          >
            <Edit />
          </IconButton>
        </Typography>
        <List sx={{ p: 3 }}>
          {category?.subCategories?.map((subCategory) => (
            <Box key={subCategory?.id}>
              <Typography variant="h5">{subCategory.name}</Typography>
              <List sx={{ p: 3 }}>
                {(subCategory?.filmIds || [])?.map((filmId) => {
                  const film = films?.find((f) => f?.id === filmId);
                  return <Box key={film?.id}>{film?.name}</Box>;
                })}
              </List>
            </Box>
          ))}
        </List>
      </Box>
  );
};
