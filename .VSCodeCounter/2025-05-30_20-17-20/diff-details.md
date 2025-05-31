# Diff Details

Date : 2025-05-30 20:17:20

Directory c:\\Users\\jondm\\OneDrive\\Desktop\\Projects\\capstone-bakery-inventory-manager\\frontend\\src

Total : 69 files,  542 codes, -109 comments, 25 blanks, all 458 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/src/app.js](/backend/src/app.js) | JavaScript | -23 | -2 | -12 | -37 |
| [backend/src/authentication/auth.middleware.js](/backend/src/authentication/auth.middleware.js) | JavaScript | -16 | 0 | -5 | -21 |
| [backend/src/db/connection.js](/backend/src/db/connection.js) | JavaScript | -4 | 0 | -2 | -6 |
| [backend/src/db/migrations/20250521235519\_create\_table\_employees.js](/backend/src/db/migrations/20250521235519_create_table_employees.js) | JavaScript | -14 | -8 | -2 | -24 |
| [backend/src/db/migrations/20250521235633\_create\_table\_unit\_conversions.js](/backend/src/db/migrations/20250521235633_create_table_unit_conversions.js) | JavaScript | -12 | -8 | -2 | -22 |
| [backend/src/db/migrations/20250521235650\_create\_table\_recipes.js](/backend/src/db/migrations/20250521235650_create_table_recipes.js) | JavaScript | -11 | -8 | -2 | -21 |
| [backend/src/db/migrations/20250521235710\_create\_table\_ingredients.js](/backend/src/db/migrations/20250521235710_create_table_ingredients.js) | JavaScript | -11 | -8 | -2 | -21 |
| [backend/src/db/migrations/20250521235726\_create\_table\_recipe\_ingredients.js](/backend/src/db/migrations/20250521235726_create_table_recipe_ingredients.js) | JavaScript | -22 | -8 | -2 | -32 |
| [backend/src/db/migrations/20250521235739\_create\_table\_bakes.js](/backend/src/db/migrations/20250521235739_create_table_bakes.js) | JavaScript | -23 | -8 | -2 | -33 |
| [backend/src/db/seeds/01\_employees.js](/backend/src/db/seeds/01_employees.js) | JavaScript | -56 | -9 | -3 | -68 |
| [backend/src/db/seeds/02\_unit\_conversions.js](/backend/src/db/seeds/02_unit_conversions.js) | JavaScript | -73 | -18 | -11 | -102 |
| [backend/src/db/seeds/03\_recipes.js](/backend/src/db/seeds/03_recipes.js) | JavaScript | -81 | -9 | -3 | -93 |
| [backend/src/db/seeds/04\_ingredients.js](/backend/src/db/seeds/04_ingredients.js) | JavaScript | -51 | -9 | -3 | -63 |
| [backend/src/db/seeds/05\_recipe\_ingredients.js](/backend/src/db/seeds/05_recipe_ingredients.js) | JavaScript | -107 | -19 | -12 | -138 |
| [backend/src/db/seeds/06\_bakes.js](/backend/src/db/seeds/06_bakes.js) | JavaScript | -132 | -12 | -10 | -154 |
| [backend/src/employees/employees.controller.js](/backend/src/employees/employees.controller.js) | JavaScript | -36 | -6 | -9 | -51 |
| [backend/src/employees/employees.middleware.js](/backend/src/employees/employees.middleware.js) | JavaScript | -89 | -6 | -16 | -111 |
| [backend/src/employees/employees.router.js](/backend/src/employees/employees.router.js) | JavaScript | -8 | 0 | -5 | -13 |
| [backend/src/employees/employees.service.js](/backend/src/employees/employees.service.js) | JavaScript | -24 | -1 | -8 | -33 |
| [backend/src/errors/asyncHandler.js](/backend/src/errors/asyncHandler.js) | JavaScript | -6 | 0 | -1 | -7 |
| [backend/src/errors/errorHandler.js](/backend/src/errors/errorHandler.js) | JavaScript | -5 | -3 | -2 | -10 |
| [backend/src/errors/methodNotAllowed.js](/backend/src/errors/methodNotAllowed.js) | JavaScript | -7 | 0 | -1 | -8 |
| [backend/src/errors/notFound.js](/backend/src/errors/notFound.js) | JavaScript | -4 | -3 | -2 | -9 |
| [backend/src/ingredients/ingredients.controller.js](/backend/src/ingredients/ingredients.controller.js) | JavaScript | -14 | -1 | -5 | -20 |
| [backend/src/ingredients/ingredients.middleware.js](/backend/src/ingredients/ingredients.middleware.js) | JavaScript | -17 | -3 | -4 | -24 |
| [backend/src/ingredients/ingredients.router.js](/backend/src/ingredients/ingredients.router.js) | JavaScript | -6 | 0 | -4 | -10 |
| [backend/src/ingredients/ingredients.service.js](/backend/src/ingredients/ingredients.service.js) | JavaScript | -12 | 0 | -4 | -16 |
| [backend/src/recipes/recipes.controller.js](/backend/src/recipes/recipes.controller.js) | JavaScript | -43 | -1 | -9 | -53 |
| [backend/src/recipes/recipes.middleware.js](/backend/src/recipes/recipes.middleware.js) | JavaScript | -48 | -6 | -6 | -60 |
| [backend/src/recipes/recipes.router.js](/backend/src/recipes/recipes.router.js) | JavaScript | -7 | 0 | -5 | -12 |
| [backend/src/recipes/recipes.service.js](/backend/src/recipes/recipes.service.js) | JavaScript | -41 | -4 | -10 | -55 |
| [backend/src/server.js](/backend/src/server.js) | JavaScript | -7 | 0 | -4 | -11 |
| [backend/src/units/units.controller.js](/backend/src/units/units.controller.js) | JavaScript | -12 | -2 | -5 | -19 |
| [backend/src/units/units.router.js](/backend/src/units/units.router.js) | JavaScript | -6 | 0 | -4 | -10 |
| [backend/src/units/units.service.js](/backend/src/units/units.service.js) | JavaScript | -16 | -2 | -5 | -23 |
| [frontend/src/App.js](/frontend/src/App.js) | JavaScript | 36 | 0 | 4 | 40 |
| [frontend/src/components/Home.js](/frontend/src/components/Home.js) | JavaScript | 129 | 1 | 4 | 134 |
| [frontend/src/components/bakes/BakesList.js](/frontend/src/components/bakes/BakesList.js) | JavaScript | 7 | 0 | 0 | 7 |
| [frontend/src/components/common/Alerts.js](/frontend/src/components/common/Alerts.js) | JavaScript | 26 | 0 | 4 | 30 |
| [frontend/src/components/common/Header.js](/frontend/src/components/common/Header.js) | JavaScript | 10 | 0 | 0 | 10 |
| [frontend/src/components/common/ScrollToTop.js](/frontend/src/components/common/ScrollToTop.js) | JavaScript | 9 | 1 | 4 | 14 |
| [frontend/src/components/common/UnitSelector.js](/frontend/src/components/common/UnitSelector.js) | JavaScript | 28 | 0 | 4 | 32 |
| [frontend/src/components/common/page-toolbar/LoginButton.js](/frontend/src/components/common/page-toolbar/LoginButton.js) | JavaScript | 65 | 0 | 7 | 72 |
| [frontend/src/components/common/page-toolbar/LoginModal.js](/frontend/src/components/common/page-toolbar/LoginModal.js) | JavaScript | 132 | 5 | 15 | 152 |
| [frontend/src/components/common/page-toolbar/PageToolbar.js](/frontend/src/components/common/page-toolbar/PageToolbar.js) | JavaScript | 72 | 0 | 6 | 78 |
| [frontend/src/components/common/page-toolbar/RegisterModal.js](/frontend/src/components/common/page-toolbar/RegisterModal.js) | JavaScript | 238 | 7 | 16 | 261 |
| [frontend/src/components/common/page-toolbar/ToolbarDropdown.js](/frontend/src/components/common/page-toolbar/ToolbarDropdown.js) | JavaScript | 41 | 0 | 5 | 46 |
| [frontend/src/components/ingredients/IngredientsCreate.js](/frontend/src/components/ingredients/IngredientsCreate.js) | JavaScript | 7 | 0 | 0 | 7 |
| [frontend/src/components/ingredients/IngredientsList.js](/frontend/src/components/ingredients/IngredientsList.js) | JavaScript | 7 | 0 | 0 | 7 |
| [frontend/src/components/recipes/AddIngredientForm.js](/frontend/src/components/recipes/AddIngredientForm.js) | JavaScript | 71 | 2 | 8 | 81 |
| [frontend/src/components/recipes/IngredientSelector.js](/frontend/src/components/recipes/IngredientSelector.js) | JavaScript | 29 | 0 | 3 | 32 |
| [frontend/src/components/recipes/RecipeIngredientsList.js](/frontend/src/components/recipes/RecipeIngredientsList.js) | JavaScript | 20 | 0 | 4 | 24 |
| [frontend/src/components/recipes/RecipeIngredientsListing.js](/frontend/src/components/recipes/RecipeIngredientsListing.js) | JavaScript | 26 | 2 | 4 | 32 |
| [frontend/src/components/recipes/RecipeView.js](/frontend/src/components/recipes/RecipeView.js) | JavaScript | 105 | 6 | 8 | 119 |
| [frontend/src/components/recipes/RecipesCreate.js](/frontend/src/components/recipes/RecipesCreate.js) | JavaScript | 7 | 0 | 0 | 7 |
| [frontend/src/components/recipes/RecipesList.js](/frontend/src/components/recipes/RecipesList.js) | JavaScript | 21 | 5 | 7 | 33 |
| [frontend/src/components/recipes/RecipesListing.js](/frontend/src/components/recipes/RecipesListing.js) | JavaScript | 9 | 0 | 2 | 11 |
| [frontend/src/components/recipes/RecipesView.js](/frontend/src/components/recipes/RecipesView.js) | JavaScript | 19 | 1 | 3 | 23 |
| [frontend/src/context/AlertsContext.js](/frontend/src/context/AlertsContext.js) | JavaScript | 23 | 1 | 6 | 30 |
| [frontend/src/context/AuthContext.js](/frontend/src/context/AuthContext.js) | JavaScript | 61 | 11 | 12 | 84 |
| [frontend/src/context/IngredientsContext.js](/frontend/src/context/IngredientsContext.js) | JavaScript | 55 | 0 | 14 | 69 |
| [frontend/src/context/RecipesContext.js](/frontend/src/context/RecipesContext.js) | JavaScript | 177 | 2 | 29 | 208 |
| [frontend/src/context/UnitsContext.js](/frontend/src/context/UnitsContext.js) | JavaScript | 57 | 1 | 15 | 73 |
| [frontend/src/index.js](/frontend/src/index.js) | JavaScript | 27 | 0 | 3 | 30 |
| [frontend/src/utils/convertUnits.js](/frontend/src/utils/convertUnits.js) | JavaScript | 11 | 0 | 4 | 15 |
| [frontend/src/utils/getIngredientShortages.js](/frontend/src/utils/getIngredientShortages.js) | JavaScript | 23 | 0 | 7 | 30 |
| [frontend/src/utils/handleInputChange.js](/frontend/src/utils/handleInputChange.js) | JavaScript | 7 | 0 | 1 | 8 |
| [frontend/src/utils/loginWithToken.js](/frontend/src/utils/loginWithToken.js) | JavaScript | 26 | 7 | 6 | 39 |
| [frontend/src/utils/modalCloser.js](/frontend/src/utils/modalCloser.js) | JavaScript | 5 | 3 | 2 | 10 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details