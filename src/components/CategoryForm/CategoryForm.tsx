import {Autocomplete, Box, Button, IconButton, Stack, TextField, Typography} from "@mui/material";
import {useCategoryForm} from "./useCategoryForm.ts";
import {DeleteForever} from "@mui/icons-material";
import {Category, CategoryAction, Film} from "../FimsAdminPanel/FilmsAdminPanel.types.ts";

interface CategoryFormProps {
  initialCategories: Category[];
  category: Category;
  films: Film[];
  handleCategoryAction: (action: CategoryAction, category?: Category) => void;
}

export const CategoryForm = ({initialCategories, category, films, handleCategoryAction}: CategoryFormProps) => {
  const {
    formCategory,
    handleChangeName,
    handleAddSubCategory,
    handleDeleteSubCategory,
    handleDeleteCategory,
    handleUpdateFilms,
    handleSubmit,
  } = useCategoryForm({initialCategories, category, handleCategoryAction})

  return (
    <Stack>
      <Typography variant="h3" pb={3}>
        {category?.name ? 'Редактирование категории' : 'Добавление новой категории'}
      </Typography>
      <Stack direction="column" useFlexGap spacing={3}>
        <Box>
          <Stack direction="row" spacing={1}>
            <TextField
              label="Категория"
              fullWidth
              placeholder="Название категории"
              value={formCategory.name}
              onChange={e => handleChangeName(e.target.value)}
            />
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => handleDeleteCategory(category)}>
                <DeleteForever/>
              </IconButton>
            </Box>
          </Stack>
        </Box>

        <Stack direction="column" useFlexGap spacing={3}>
          {!!formCategory?.subCategories?.length && formCategory.subCategories.map((subCategory) => (
            <Stack useFlexGap spacing={3} key={subCategory.id}>
              <Stack direction="row" spacing={1}>
                <TextField
                  label="Подкатегория"
                  fullWidth
                  placeholder="Название подкатегории"
                  value={subCategory.name}
                  onChange={(e) => handleChangeName(e.target.value, subCategory.id)}
                />
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleDeleteSubCategory(subCategory.id)}>
                    <DeleteForever/>
                  </IconButton>
                </Box>

              </Stack>

              <Stack direction="row" spacing={1}>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={films}
                  value={(subCategory?.filmIds || [])?.map((filmId) => films?.find((f) => f?.id === filmId))}
                  onChange={(e, newFilms) => handleUpdateFilms(subCategory.id, newFilms.map((film) => film.id))}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Фильмы"
                      placeholder="Фильмы"
                    />
                  )}
                  sx={{ width: '100%' }}
                />
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleUpdateFilms(subCategory.id, [])}>
                    <DeleteForever/>
                  </IconButton>
                </Box>
              </Stack>
            </Stack>
          ))}
          <Stack direction="row" spacing={3}>
            <Button variant="contained" size="small" onClick={handleAddSubCategory}>Добавить подкатегорию</Button>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3}>
          <Button variant="contained" onClick={() => handleCategoryAction(CategoryAction.Cancel)}>Отменить</Button>
          <Button variant="contained" onClick={() => handleSubmit()}>Сохранить</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
