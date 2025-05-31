import { handleInputChange } from "../../utils/handleInputChange";

export function UnitSelector({ formData, setFormData, units }) {

  const unitsList = units.map((unit) => {
    return (
      <option key={unit} value={unit}>
        {unit}
      </option>
    );
  });

  return (
    <>
      <label htmlFor="unit" className="form-label">
        Unit
      </label>
      <select
        id="unit"
        className="form-select"
        name="unit"
        value={formData.unit}
        onChange={(event) => handleInputChange(event, formData, setFormData)}
        aria-label="Select unit"
      >
        <option value="">-- Select unit --</option>
        {unitsList}
      </select>
    </>
  );
}
