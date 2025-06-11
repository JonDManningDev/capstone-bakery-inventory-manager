import { Routes, Route } from "react-router-dom";

import { CreateRecipe } from "./components/recipes/CreateRecipe";
import { EditRecipe } from "./components/recipes/EditRecipe";
import { LoginModal } from "./components/common/page-toolbar/LoginModal";
import { RegisterModal } from "./components/common/page-toolbar/RegisterModal";
import { PageToolbar } from "./components/common/page-toolbar/PageToolbar";
import { Alerts } from "./components/common/Alerts";
import { Header } from "./components/common/Header";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { Home } from "./components/Home";
import { BakesList } from "./components/bakes/BakesList";
import { RecipesView } from "./components/recipes/RecipesView";
import { RecipeView } from "./components/recipes/RecipeView";
import { IngredientsList } from "./components/ingredients/IngredientsList";
import { IngredientsCreate } from "./components/ingredients/IngredientsCreate";

function App() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <Header />
      <PageToolbar />
      <Alerts />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bakes" element={<BakesList />} />
        <Route path="/recipes" element={<RecipesView />} />
        <Route path="/recipes/:recipeId" element={<RecipeView />} />
        <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />
        <Route path="/recipes/new" element={<CreateRecipe />} />
        <Route path="/ingredients" element={<IngredientsList />} />
        <Route path="/ingredients/new" element={<IngredientsCreate />} />
      </Routes>
    </>
  );
}

export default App;
