import { Routes, Route } from "react-router-dom";

import { LoginModal } from "./components/common/page-toolbar/LoginModal";
import { RegisterModal } from "./components/common/page-toolbar/RegisterModal";
import { PageToolbar } from "./components/common/page-toolbar/PageToolbar";
import { Alerts } from "./components/common/Alerts";
import { Header } from "./components/common/Header";
import { Home } from "./components/Home";
import { BakesList } from "./components/bakes/BakesList";
import { RecipesList } from "./components/recipes/RecipesList";
import { RecipesCreate } from "./components/recipes/RecipesCreate";
import { IngredientsList } from "./components/ingredients/IngredientsList"
import { IngredientsCreate } from "./components/ingredients/IngredientsCreate";

function App() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <Header />
      <PageToolbar />
      <Alerts />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bakes" element={<BakesList />} />
        <Route path="/recipes" element={<RecipesList />} />
        <Route path="/recipes/new" element={<RecipesCreate />} />
        <Route path="/ingredients" element={<IngredientsList />} />
        <Route path="/ingredients/new" element={<IngredientsCreate />} />
      </Routes>
    </>
  );
}

export default App;
