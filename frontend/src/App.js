import { Routes, Route } from "react-router-dom";

import { CreateRecipe } from "./components/create-edit-recipe-view/CreateRecipe";
import { EditRecipe } from "./components/create-edit-recipe-view/EditRecipe";
import { EditIngredient } from "./components/create-edit-ingredient-view/EditIngredient";
import { LoginModal } from "./components/common/page-toolbar/LoginModal";
import { RegisterModal } from "./components/common/page-toolbar/RegisterModal";
import { PageToolbar } from "./components/common/page-toolbar/PageToolbar";
import { Alerts } from "./components/common/Alerts";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { Home } from "./components/Home";
import { ViewBakes } from "./components/bakes-view/ViewBakes";
import { ViewRecipes } from "./components/recipes-view/ViewRecipes";
import { ViewRecipe } from "./components/recipe-view/ViewRecipe";
import { ViewIngredients } from "./components/ingredients-view/ViewIngredients";
import { CreateIngredient } from "./components/create-edit-ingredient-view/CreateIngredient";
import { ViewIngredient } from "./components/ingredient-view/ViewIngredient";

function App() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <PageToolbar />
      <Alerts />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bakes" element={<ViewBakes />} />
        <Route path="/recipes" element={<ViewRecipes />} />
        <Route path="/recipes/new" element={<CreateRecipe />} />
        <Route path="/recipes/:recipeId" element={<ViewRecipe />} />
        <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />
        <Route path="/ingredients" element={<ViewIngredients />} />
        <Route path="/ingredients/new" element={<CreateIngredient />} />
        <Route path="/ingredients/:ingredientId" element={<ViewIngredient />} />
        <Route
          path="/ingredients/:ingredientId/edit"
          element={<EditIngredient />}
        />
      </Routes>
    </>
  );
}

export default App;
