import { useLocation } from "react-router-dom";

import { handleInputChange } from "../../utils/handleInputChange";

export function UnitSelector({ formData, setFormData, units }) {
  const location = useLocation();

  const inRecipe = location.pathname.includes("recipes");

  const unitsList = units.map((unit) => {
    return (
      <option key={unit} value={unit}>
        {unit}
      </option>
    );
  });

  return (
    <>
      <label htmlFor={inRecipe ? "unit" : "ingredient-base-unit"} className="form-label">
        Unit
      </label>
      <select
        id={inRecipe ? "unit" : "ingredient-base-unit"}
        className="form-select"
        name={inRecipe ? "unit" : "base_unit"}
        value={inRecipe ? formData.unit : formData.base_unit}
        onChange={(event) => handleInputChange(event, formData, setFormData)}
        aria-label={inRecipe ? "select unit" : "select base unit"}
      >
        <option value="">{inRecipe ? "-- Select unit --" : "-- Select base unit --"}</option>
        {unitsList}
      </select>
    </>
  );
}
