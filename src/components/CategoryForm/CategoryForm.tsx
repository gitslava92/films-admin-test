import {Autocomplete, Box, Button, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";
import {Category, Film} from "../FilmsAdminPanel";
import {useCategoryForm} from "./hooks";

interface CategoryFormProps {
  initialCategories: Category[];
  category: Category;
  films: Film[];
  onDeleteCategory: (category: Category) => void;
  onSaveCategory: (category: Category) => void;
  handleCancel: () => void;
}

export const CategoryForm = ({
    initialCategories,
    category,
    films,
    onDeleteCategory,
    onSaveCategory,
    handleCancel
  }: CategoryFormProps) => {
  const {
    formCategory,
    handleChangeName,
    handleAddSubCategory,
    handleDeleteSubCategory,
    handleDeleteCategory,
    handleUpdateFilms,
    handleSubmit,
  } = useCategoryForm({
    initialCategories,
    category,
    onDeleteCategory,
    onSaveCategory,
  })

  return (
    <Stack>
      <Typography variant="h3" pb={3} textAlign="center">
        {category?.name ? 'Редактирование категории' : 'Добавление новой категории'}
      </Typography>
      <Stack direction="column" useFlexGap spacing={3}>
        <Paper elevation={8} sx={{p: 3}}>
          <TextField
            label="Категория"
            fullWidth
            placeholder="Название категории"
            value={formCategory.name}
            onChange={e => handleChangeName(e.target.value)}
          />
        </Paper>

        <Stack direction="column" useFlexGap spacing={3}>
          {!!formCategory?.subCategories?.length && formCategory.subCategories.map((subCategory) => (
            <Stack useFlexGap spacing={3} key={subCategory.id}>
              <Paper elevation={8} sx={{p: 3}}>
                <Stack direction="column" useFlexGap spacing={3}>
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
                      sx={{width: '100%'}}
                    />
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          ))}
          <Stack direction="row" spacing={3}>
            <Button variant="contained" size="small" onClick={handleAddSubCategory}>Добавить подкатегорию</Button>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3}>
          <Button variant="contained" onClick={handleCancel}>Отменить</Button>
          <Button variant="contained" color="error" onClick={() => handleDeleteCategory(category)}>Удалить
            категорию</Button>
          <Button variant="contained" onClick={() => handleSubmit()}>Сохранить</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
