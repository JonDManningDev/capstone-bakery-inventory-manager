export function convertUnits(amount, fromUnit, toUnit, conversions) {
  if (fromUnit === toUnit) return amount;

  const conversion = conversions.find(
    (entry) => entry.from_unit === fromUnit && entry.to_unit === toUnit
  );

  if (!conversion) {
    console.warn(`No conversion found from ${fromUnit} to ${toUnit}.`);
    return null;
  }

  return amount * conversion.factor;
}
