import { handleInputChange } from "../../utils/handleInputChange";

export function IngredientSelector({ formData, setFormData, ingredients }) {
  const ingredientsSorted = ingredients.sort((a, b) => a.name.localeCompare(b.name, undefined, {sensitivity: "base"}));
  const ingredientsList = ingredientsSorted.map((ingredient) => {
    return (
      <option key={ingredient.ingredient_id} value={ingredient.name}>
        {ingredient.name}
      </option>
    );
  });

  return (
    <>
      <label htmlFor="ingredient-select" className="form-label">
        Select Ingredient
      </label>
      <select
        id="ingredient-select"
        name="ingredient"
        className="form-select"
        value={formData.ingredient}
        onChange={(event) => handleInputChange(event, formData, setFormData)}
        aria-label="Select ingredient"
      >
        <option value="">-- Select ingredient --</option>
        {ingredientsList}
      </select>
    </>
  );
}
