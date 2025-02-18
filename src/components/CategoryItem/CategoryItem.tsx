import {Box, IconButton, List, Paper, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {Category, Film} from "../FilmsAdminPanel";

interface CategoryItemProps {
  category: Category;
  films: Film[];
  handleEditCategory: (category: Category) => void;
}

export const CategoryItem = ({category, handleEditCategory, films}: CategoryItemProps) => {
  return (
      <Paper elevation={8} sx={{p: 3, mb: 3}}>
        <Typography variant="h4" sx={{ display: 'flex', gap: 3 }}>
          {category.name}
          <IconButton
            color="primary"
            onClick={() => handleEditCategory(category)}
          >
            <Edit />
          </IconButton>
        </Typography>
        <List sx={{ pl: 5 }}>
          {category?.subCategories?.map((subCategory) => (
            <Box key={subCategory?.id}>
              <Typography variant="h5">{subCategory.name}</Typography>
              <List sx={{ pl: 5 }}>
                {(subCategory?.filmIds || [])?.map((filmId) => {
                  const film = films?.find((f) => f?.id === filmId);
                  return <Box key={film?.id}>{film?.name}</Box>;
                })}
              </List>
            </Box>
          ))}
        </List>
      </Paper>
  );
};
