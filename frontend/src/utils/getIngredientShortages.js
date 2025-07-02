import { convertUnits } from "./convertUnits";

export function getIngredientShortages(
  recipe,
  ingredients,
  conversions,
  setShortages
) {
  const inventoryMap = new Map(
    ingredients.map((ingredient) => [ingredient.id, ingredient])
  );
  const shortages = [];

  for (const ingredient of recipe.ingredients) {
    const inStock = inventoryMap.get(ingredient.id);

    if (!inStock) {
      shortages.push({ ...ingredient, issue: "Missing from inventory" });
    }

    const { amount_needed, unit } = ingredient;
    const baseUnit = inStock.base_unit;
    const stock = inStock.quantity_in_stock;

    const convertedAmount = convertUnits(
      amount_needed,
      unit,
      baseUnit,
      conversions
    );

    if (convertedAmount > stock) {
      const shortageAmount = convertedAmount - stock;
      shortages.push({
        ...ingredient,
        available: inStock.quantity_in_stock,
        issue: `Insufficient stock: additional ${shortageAmount} ${baseUnit} needed`,
        baseUnit,
      });
    }
  }

  return setShortages(shortages);
}
