# Details

Date : 2025-05-30 20:14:48

Directory c:\\Users\\jondm\\OneDrive\\Desktop\\Projects\\capstone-bakery-inventory-manager\\backend

Total : 42 files,  8291 codes, 169 comments, 238 blanks, all 8698 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/knexfile.js](/backend/knexfile.js) | JavaScript | 51 | 5 | 4 | 60 |
| [backend/package-lock.json](/backend/package-lock.json) | JSON | 6,851 | 0 | 1 | 6,852 |
| [backend/package.json](/backend/package.json) | JSON | 35 | 0 | 1 | 36 |
| [backend/src/app.js](/backend/src/app.js) | JavaScript | 23 | 2 | 12 | 37 |
| [backend/src/authentication/auth.middleware.js](/backend/src/authentication/auth.middleware.js) | JavaScript | 16 | 0 | 5 | 21 |
| [backend/src/db/connection.js](/backend/src/db/connection.js) | JavaScript | 4 | 0 | 2 | 6 |
| [backend/src/db/migrations/20250521235519\_create\_table\_employees.js](/backend/src/db/migrations/20250521235519_create_table_employees.js) | JavaScript | 14 | 8 | 2 | 24 |
| [backend/src/db/migrations/20250521235633\_create\_table\_unit\_conversions.js](/backend/src/db/migrations/20250521235633_create_table_unit_conversions.js) | JavaScript | 12 | 8 | 2 | 22 |
| [backend/src/db/migrations/20250521235650\_create\_table\_recipes.js](/backend/src/db/migrations/20250521235650_create_table_recipes.js) | JavaScript | 11 | 8 | 2 | 21 |
| [backend/src/db/migrations/20250521235710\_create\_table\_ingredients.js](/backend/src/db/migrations/20250521235710_create_table_ingredients.js) | JavaScript | 11 | 8 | 2 | 21 |
| [backend/src/db/migrations/20250521235726\_create\_table\_recipe\_ingredients.js](/backend/src/db/migrations/20250521235726_create_table_recipe_ingredients.js) | JavaScript | 22 | 8 | 2 | 32 |
| [backend/src/db/migrations/20250521235739\_create\_table\_bakes.js](/backend/src/db/migrations/20250521235739_create_table_bakes.js) | JavaScript | 23 | 8 | 2 | 33 |
| [backend/src/db/seeds/01\_employees.js](/backend/src/db/seeds/01_employees.js) | JavaScript | 56 | 9 | 3 | 68 |
| [backend/src/db/seeds/02\_unit\_conversions.js](/backend/src/db/seeds/02_unit_conversions.js) | JavaScript | 73 | 18 | 11 | 102 |
| [backend/src/db/seeds/03\_recipes.js](/backend/src/db/seeds/03_recipes.js) | JavaScript | 81 | 9 | 3 | 93 |
| [backend/src/db/seeds/04\_ingredients.js](/backend/src/db/seeds/04_ingredients.js) | JavaScript | 51 | 9 | 3 | 63 |
| [backend/src/db/seeds/05\_recipe\_ingredients.js](/backend/src/db/seeds/05_recipe_ingredients.js) | JavaScript | 107 | 19 | 12 | 138 |
| [backend/src/db/seeds/06\_bakes.js](/backend/src/db/seeds/06_bakes.js) | JavaScript | 132 | 12 | 10 | 154 |
| [backend/src/employees/employees.controller.js](/backend/src/employees/employees.controller.js) | JavaScript | 36 | 6 | 9 | 51 |
| [backend/src/employees/employees.middleware.js](/backend/src/employees/employees.middleware.js) | JavaScript | 89 | 6 | 16 | 111 |
| [backend/src/employees/employees.router.js](/backend/src/employees/employees.router.js) | JavaScript | 8 | 0 | 5 | 13 |
| [backend/src/employees/employees.service.js](/backend/src/employees/employees.service.js) | JavaScript | 24 | 1 | 8 | 33 |
| [backend/src/errors/asyncHandler.js](/backend/src/errors/asyncHandler.js) | JavaScript | 6 | 0 | 1 | 7 |
| [backend/src/errors/errorHandler.js](/backend/src/errors/errorHandler.js) | JavaScript | 5 | 3 | 2 | 10 |
| [backend/src/errors/methodNotAllowed.js](/backend/src/errors/methodNotAllowed.js) | JavaScript | 7 | 0 | 1 | 8 |
| [backend/src/errors/notFound.js](/backend/src/errors/notFound.js) | JavaScript | 4 | 3 | 2 | 9 |
| [backend/src/ingredients/ingredients.controller.js](/backend/src/ingredients/ingredients.controller.js) | JavaScript | 14 | 1 | 5 | 20 |
| [backend/src/ingredients/ingredients.middleware.js](/backend/src/ingredients/ingredients.middleware.js) | JavaScript | 17 | 3 | 4 | 24 |
| [backend/src/ingredients/ingredients.router.js](/backend/src/ingredients/ingredients.router.js) | JavaScript | 6 | 0 | 4 | 10 |
| [backend/src/ingredients/ingredients.service.js](/backend/src/ingredients/ingredients.service.js) | JavaScript | 12 | 0 | 4 | 16 |
| [backend/src/recipes/recipes.controller.js](/backend/src/recipes/recipes.controller.js) | JavaScript | 43 | 1 | 9 | 53 |
| [backend/src/recipes/recipes.middleware.js](/backend/src/recipes/recipes.middleware.js) | JavaScript | 48 | 6 | 6 | 60 |
| [backend/src/recipes/recipes.router.js](/backend/src/recipes/recipes.router.js) | JavaScript | 7 | 0 | 5 | 12 |
| [backend/src/recipes/recipes.service.js](/backend/src/recipes/recipes.service.js) | JavaScript | 41 | 4 | 10 | 55 |
| [backend/src/server.js](/backend/src/server.js) | JavaScript | 7 | 0 | 4 | 11 |
| [backend/src/units/units.controller.js](/backend/src/units/units.controller.js) | JavaScript | 12 | 2 | 5 | 19 |
| [backend/src/units/units.router.js](/backend/src/units/units.router.js) | JavaScript | 6 | 0 | 4 | 10 |
| [backend/src/units/units.service.js](/backend/src/units/units.service.js) | JavaScript | 16 | 2 | 5 | 23 |
| [backend/test/drop-database.js](/backend/test/drop-database.js) | JavaScript | 11 | 0 | 4 | 15 |
| [backend/test/ingredients.test.js](/backend/test/ingredients.test.js) | JavaScript | 152 | 0 | 29 | 181 |
| [backend/test/jest.config.js](/backend/test/jest.config.js) | JavaScript | 3 | 0 | 1 | 4 |
| [backend/test/recipes.test.js](/backend/test/recipes.test.js) | JavaScript | 144 | 0 | 16 | 160 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)