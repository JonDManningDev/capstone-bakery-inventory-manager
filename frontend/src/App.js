import { Routes, Route } from "react-router-dom";

import { CreateRecipe } from "./components/recipes/CreateRecipe";
import { EditRecipe } from "./components/recipes/EditRecipe";
import { EditIngredient } from "./components/ingredients/EditIngredient";
import { LoginModal } from "./components/common/page-toolbar/LoginModal";
import { RegisterModal } from "./components/common/page-toolbar/RegisterModal";
import { PageToolbar } from "./components/common/page-toolbar/PageToolbar";
import { Alerts } from "./components/common/Alerts";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { Home } from "./components/Home";
import { ViewBakes } from "./components/bakes/ViewBakes";
import { RecipesView } from "./components/recipes/RecipesView";
import { RecipeView } from "./components/recipes/RecipeView";
import { ViewIngredients } from "./components/ingredients/ViewIngredients";
import { CreateIngredient } from "./components/ingredients/CreateIngredient";
import { ViewIngredient } from "./components/ingredients/ViewIngredient";

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
        <Route path="/recipes" element={<RecipesView />} />
        <Route path="/recipes/new" element={<CreateRecipe />} />
        <Route path="/recipes/:recipeId" element={<RecipeView />} />
        <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />        
        <Route path="/ingredients" element={<ViewIngredients />} />
        <Route path="/ingredients/new" element={<CreateIngredient />} />
        <Route path="/ingredients/:ingredientId" element={<ViewIngredient />} />
        <Route path="/ingredients/:ingredientId/edit" element={<EditIngredient />} />
      </Routes>
    </>
  );
}

export default App;
